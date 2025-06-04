import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
  // Create a new user
  static async create({ name, email, password, preferences }) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const query = `
      INSERT INTO users (name, email, password, preferences, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, name, email, preferences, created_at, updated_at
    `;
    const result = await pool.query(query, [name, email, hashedPassword, preferences || null]);
    return result.rows[0];
  }

  // Find user by email (returns full object incl. hashed password)
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Find user by ID (returns public fields only)
  static async findById(id) {
    const query = `
      SELECT id, name, email, preferences, created_at, updated_at
      FROM users
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Compare passwords
  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Add this method for compatibility with your controller
  static async verifyPassword(plainPassword, hashedPassword) {
    return this.comparePassword(plainPassword, hashedPassword);
  }
  
  // Update user profile with partial updates
  static async updateProfile(id, { name, email }) {
    const fields = [];
    const values = [id];
    let idx = 2;

    if (name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(name);
    }

    if (email !== undefined) {
      fields.push(`email = $${idx++}`);
      values.push(email);
    }

    if (fields.length === 0) {
      throw new Error('Nothing to update');
    }

    const query = `
      UPDATE users SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $1
      RETURNING id, name, email, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Add this method to support updateById in your controller
  static async updateById(id, { name, preferences }) {
    const fields = [];
    const values = [id];
    let idx = 2;

    if (name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(name);
    }

    if (preferences !== undefined) {
      fields.push(`preferences = $${idx++}`);
      values.push(preferences);
    }

    if (fields.length === 0) {
      throw new Error('Nothing to update');
    }

    const query = `
      UPDATE users SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $1
      RETURNING id, name, email, preferences, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}