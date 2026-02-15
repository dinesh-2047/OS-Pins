/**
 * Logger
 * Structured logging with automatic sanitization of sensitive data
 */

import { createLogEntry } from './sanitize.js';

class Logger {
  /**
   * Log info message
   * @param {string} event - Event name
   * @param {string} message - Log message
   * @param {object} metadata - Additional metadata
   */
  info(event, message, metadata = {}) {
    const entry = createLogEntry('INFO', event, message, metadata);
    console.log(JSON.stringify(entry));
  }

  /**
   * Log warning message
   * @param {string} event - Event name
   * @param {string} message - Log message
   * @param {object} metadata - Additional metadata
   */
  warn(event, message, metadata = {}) {
    const entry = createLogEntry('WARN', event, message, metadata);
    console.warn(JSON.stringify(entry));
  }

  /**
   * Log error message
   * @param {string} event - Event name
   * @param {string} message - Log message
   * @param {object} metadata - Additional metadata
   */
  error(event, message, metadata = {}) {
    const entry = createLogEntry('ERROR', event, message, metadata);
    console.error(JSON.stringify(entry));
  }
}

// Export singleton instance
const logger = new Logger();

export default logger;
