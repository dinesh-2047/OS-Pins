/**
 * Rate Limiter
 * Implements sliding window rate limiting to prevent abuse
 */

class RateLimiter {
  constructor() {
    // Map: IP address -> array of request timestamps
    this.requests = new Map();
    
    // Configuration: 10 requests per 15 minutes
    this.MAX_REQUESTS = 10;
    this.WINDOW_MS = 15 * 60 * 1000; // 15 minutes in milliseconds
    
    // Cleanup old entries every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Get client IP address from request
   * @param {Request} request - Next.js request object
   * @returns {string} IP address
   */
  getClientIp(request) {
    // Try to get real IP from headers (for proxies/load balancers)
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
      return realIp;
    }
    
    // Fallback to a default (not ideal, but prevents crashes)
    return 'unknown';
  }

  /**
   * Check if request should be rate limited
   * @param {Request} request - Next.js request object
   * @returns {object} { allowed: boolean, retryAfter?: number }
   */
  checkLimit(request) {
    const ip = this.getClientIp(request);
    const now = Date.now();
    
    // Get existing requests for this IP
    let timestamps = this.requests.get(ip) || [];
    
    // Remove timestamps outside the window
    timestamps = timestamps.filter(ts => now - ts < this.WINDOW_MS);
    
    // Check if limit exceeded
    if (timestamps.length >= this.MAX_REQUESTS) {
      // Calculate retry-after (time until oldest request expires)
      const oldestTimestamp = timestamps[0];
      const retryAfter = Math.ceil((oldestTimestamp + this.WINDOW_MS - now) / 1000);
      
      return {
        allowed: false,
        retryAfter
      };
    }
    
    // Add current request timestamp
    timestamps.push(now);
    this.requests.set(ip, timestamps);
    
    return {
      allowed: true
    };
  }

  /**
   * Cleanup old entries from memory
   * @private
   */
  cleanup() {
    const now = Date.now();
    
    for (const [ip, timestamps] of this.requests.entries()) {
      // Filter out old timestamps
      const validTimestamps = timestamps.filter(ts => now - ts < this.WINDOW_MS);
      
      if (validTimestamps.length === 0) {
        // Remove entry if no valid timestamps
        this.requests.delete(ip);
      } else {
        // Update with filtered timestamps
        this.requests.set(ip, validTimestamps);
      }
    }
  }

  /**
   * Clear all rate limit data (useful for testing)
   */
  clear() {
    this.requests.clear();
  }

  /**
   * Cleanup interval on shutdown
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Export singleton instance
const rateLimiter = new RateLimiter();

export default rateLimiter;
