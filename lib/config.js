/**
 * Configuration Manager
 * Loads and validates environment variables for GitHub OAuth authentication
 */

class Config {
  constructor() {
    this._githubClientId = process.env.GITHUB_CLIENT_ID;
    this._githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
    this._githubCallbackUrl = process.env.GITHUB_CALLBACK_URL;
    this._sessionSecret = process.env.SESSION_SECRET;
    this._appUrl = process.env.NEXT_PUBLIC_APP_URL;
  }

  get githubClientId() {
    return this._githubClientId;
  }

  get githubClientSecret() {
    return this._githubClientSecret;
  }

  get githubCallbackUrl() {
    return this._githubCallbackUrl;
  }

  get sessionSecret() {
    return this._sessionSecret;
  }

  get appUrl() {
    return this._appUrl;
  }

  /**
   * Validate all required configuration is present
   * @throws {Error} If any required config is missing
   */
  validate() {
    const missing = [];

    if (!this._githubClientId) {
      missing.push('GITHUB_CLIENT_ID');
    }
    if (!this._githubClientSecret) {
      missing.push('GITHUB_CLIENT_SECRET');
    }
    if (!this._githubCallbackUrl) {
      missing.push('GITHUB_CALLBACK_URL');
    }
    if (!this._sessionSecret) {
      missing.push('SESSION_SECRET');
    }
    if (!this._appUrl) {
      missing.push('NEXT_PUBLIC_APP_URL');
    }

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}. ` +
        `Please check your .env.local file and ensure all required variables are set.`
      );
    }

    // Validate session secret length
    if (this._sessionSecret.length < 32) {
      throw new Error(
        'SESSION_SECRET must be at least 32 characters long for security. ' +
        'Generate a secure secret using: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
      );
    }
  }
}

// Export singleton instance
const config = new Config();

export default config;
