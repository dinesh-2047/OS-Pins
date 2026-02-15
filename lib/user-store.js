/**
 * User Store
 * Manages user data persistence with database-agnostic interface
 */

import crypto from 'crypto';

class UserStore {
  constructor() {
    // In-memory user storage
    // Map: userId -> User
    this.users = new Map();
    // Map: githubId -> userId (for fast lookup)
    this.githubIdIndex = new Map();
  }

  /**
   * Find user by GitHub ID
   * @param {number} githubId - GitHub user ID
   * @returns {Promise<User|null>} User record or null if not found
   */
  async findByGitHubId(githubId) {
    const userId = this.githubIdIndex.get(githubId);
    
    if (!userId) {
      return null;
    }
    
    return this.users.get(userId) || null;
  }

  /**
   * Create new user
   * @param {CreateUserData} data - User data from GitHub
   * @returns {Promise<User>} Created user record
   * @throws {Error} If creation fails
   */
  async createUser(data) {
    // Generate UUID v4 for internal user ID
    const id = crypto.randomUUID();
    
    const now = new Date();
    
    const user = {
      id,
      githubId: data.githubId,
      username: data.username,
      avatarUrl: data.avatarUrl,
      email: data.email || null,
      createdAt: now,
      updatedAt: now
    };
    
    // Store user
    this.users.set(id, user);
    this.githubIdIndex.set(data.githubId, id);
    
    return user;
  }

  /**
   * Update existing user
   * @param {string} userId - Internal user ID
   * @param {UpdateUserData} data - Updated user data
   * @returns {Promise<User>} Updated user record
   * @throws {Error} If update fails
   */
  async updateUser(userId, data) {
    const user = this.users.get(userId);
    
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }
    
    // Update only provided fields
    if (data.username !== undefined) {
      user.username = data.username;
    }
    if (data.avatarUrl !== undefined) {
      user.avatarUrl = data.avatarUrl;
    }
    if (data.email !== undefined) {
      user.email = data.email;
    }
    
    // Update timestamp
    user.updatedAt = new Date();
    
    this.users.set(userId, user);
    
    return user;
  }
}

// Export singleton instance
const userStore = new UserStore();

export default userStore;
