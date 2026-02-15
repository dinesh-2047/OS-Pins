/**
 * Session Manager
 * Creates and manages user sessions with secure cookie-based storage
 */

import crypto from 'crypto';

class SessionManager {
  constructor() {
    // In-memory session storage (Map: token -> session)
    this.sessions = new Map();
    
    // Session duration: 30 days in milliseconds
    this.SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
  }

  /**
   * Create new session for user
   * @param {string} userId - Internal user ID
   * @returns {Promise<Session>} Created session
   */
  async createSession(userId) {
    // Generate secure random token (32 bytes, base64-encoded)
    const token = crypto.randomBytes(32).toString('base64');
    
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.SESSION_DURATION_MS);
    
    const session = {
      token,
      userId,
      expiresAt,
      createdAt: now
    };
    
    this.sessions.set(token, session);
    
    return session;
  }

  /**
   * Validate session token
   * @param {string} token - Session token
   * @returns {Promise<Session|null>} Session if valid, null otherwise
   */
  async validateSession(token) {
    const session = this.sessions.get(token);
    
    if (!session) {
      return null;
    }
    
    // Check if session has expired
    if (new Date() > session.expiresAt) {
      this.sessions.delete(token);
      return null;
    }
    
    return session;
  }

  /**
   * Delete session
   * @param {string} token - Session token
   * @returns {Promise<void>}
   */
  async deleteSession(token) {
    this.sessions.delete(token);
  }

  /**
   * Create cookie header for session
   * @param {string} token - Session token
   * @returns {string} Set-Cookie header value
   */
  createCookieHeader(token) {
    const isProduction = process.env.NODE_ENV === 'production';
    const maxAge = Math.floor(this.SESSION_DURATION_MS / 1000); // Convert to seconds
    
    const cookieAttributes = [
      `session=${token}`,
      `Max-Age=${maxAge}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax'
    ];
    
    // Only set Secure flag in production (requires HTTPS)
    if (isProduction) {
      cookieAttributes.push('Secure');
    }
    
    return cookieAttributes.join('; ');
  }
}

// Export singleton instance
const sessionManager = new SessionManager();

export default sessionManager;
