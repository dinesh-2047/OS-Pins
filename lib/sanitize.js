/**
 * Sanitization Utility
 * Removes sensitive data from logs and error messages
 */

/**
 * List of sensitive field names to redact
 */
const SENSITIVE_FIELDS = [
  'access_token',
  'accessToken',
  'token',
  'secret',
  'password',
  'client_secret',
  'clientSecret',
  'session',
  'sessionToken',
  'state',
  'oauth_state',
  'authorization',
  'cookie',
  'set-cookie'
];

/**
 * Patterns to detect sensitive data in strings
 */
const SENSITIVE_PATTERNS = [
  /Bearer\s+[A-Za-z0-9\-._~+/]+=*/gi,  // Bearer tokens
  /ghp_[A-Za-z0-9]{36}/gi,              // GitHub personal access tokens
  /gho_[A-Za-z0-9]{36}/gi,              // GitHub OAuth tokens
  /ghs_[A-Za-z0-9]{36}/gi,              // GitHub server tokens
  /session=[^;]+/gi,                     // Session cookies
  /oauth_state=[^;]+/gi                  // OAuth state cookies
];

/**
 * Sanitize an object by removing sensitive fields
 * @param {any} obj - Object to sanitize
 * @returns {any} Sanitized object
 */
export function sanitizeObject(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== 'object') {
    return sanitizeString(String(obj));
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    
    // Check if field name is sensitive
    if (SENSITIVE_FIELDS.some(field => lowerKey.includes(field.toLowerCase()))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = sanitizeString(String(value));
    }
  }

  return sanitized;
}

/**
 * Sanitize a string by redacting sensitive patterns
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') {
    return str;
  }

  let sanitized = str;

  // Replace sensitive patterns
  for (const pattern of SENSITIVE_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[REDACTED]');
  }

  return sanitized;
}

/**
 * Sanitize an error object for logging
 * @param {Error} error - Error to sanitize
 * @returns {object} Sanitized error object
 */
export function sanitizeError(error) {
  return {
    message: sanitizeString(error.message),
    name: error.name,
    // Don't include stack trace in production
    ...(process.env.NODE_ENV !== 'production' && { stack: sanitizeString(error.stack) })
  };
}

/**
 * Create a sanitized log entry
 * @param {string} level - Log level (INFO, WARN, ERROR)
 * @param {string} event - Event name
 * @param {string} message - Log message
 * @param {object} metadata - Additional metadata
 * @returns {object} Sanitized log entry
 */
export function createLogEntry(level, event, message, metadata = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    event,
    message: sanitizeString(message),
    metadata: sanitizeObject(metadata)
  };
}
