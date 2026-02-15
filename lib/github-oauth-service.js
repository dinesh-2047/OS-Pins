/**
 * GitHub OAuth Service
 * Encapsulates all interactions with GitHub's OAuth and API endpoints
 */

import config from './config.js';

class GitHubOAuthService {
  constructor() {
    this.TOKEN_EXCHANGE_URL = 'https://github.com/login/oauth/access_token';
    this.USER_API_URL = 'https://api.github.com/user';
    this.USER_EMAILS_URL = 'https://api.github.com/user/emails';
    this.REQUEST_TIMEOUT = 10000; // 10 seconds
  }

  /**
   * Make HTTP request with retry logic
   * @private
   */
  async _fetchWithRetry(url, options, retries = 1) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      return response;
    } catch (error) {
      if (retries > 0 && (error.name === 'AbortError' || error.code === 'ECONNREFUSED')) {
        // Wait 1 second before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this._fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  }

  /**
   * Exchange authorization code for access token
   * @param {string} code - Authorization code from GitHub
   * @returns {Promise<string>} Access token
   * @throws {Error} If exchange fails
   */
  async exchangeCodeForToken(code) {
    const response = await this._fetchWithRetry(
      this.TOKEN_EXCHANGE_URL,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: config.githubClientId,
          client_secret: config.githubClientSecret,
          code
        })
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub token exchange failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`);
    }

    if (!data.access_token) {
      throw new Error('No access token received from GitHub');
    }

    return data.access_token;
  }

  /**
   * Fetch authenticated user's profile data
   * @param {string} accessToken - GitHub access token
   * @returns {Promise<GitHubUser>} User profile data
   * @throws {Error} If fetch fails
   */
  async fetchUserProfile(accessToken) {
    const response = await this._fetchWithRetry(
      this.USER_API_URL,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'OS-Pins'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub user fetch failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      login: data.login,
      avatar_url: data.avatar_url,
      email: data.email || null
    };
  }

  /**
   * Fetch user's email addresses
   * @param {string} accessToken - GitHub access token
   * @returns {Promise<string|null>} Primary email or null
   */
  async fetchUserEmail(accessToken) {
    try {
      const response = await this._fetchWithRetry(
        this.USER_EMAILS_URL,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'OS-Pins'
          }
        }
      );

      if (!response.ok) {
        // If we can't fetch emails, return null (not critical)
        return null;
      }

      const emails = await response.json();

      // Find primary verified email
      const primaryEmail = emails.find(e => e.primary && e.verified);

      return primaryEmail ? primaryEmail.email : null;
    } catch (error) {
      // Email fetch is not critical, return null on error
      return null;
    }
  }
}

// Export singleton instance
const githubOAuthService = new GitHubOAuthService();

export default githubOAuthService;
