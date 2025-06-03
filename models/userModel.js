import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  static async create(userData) {
    const { email, password, firstName, lastName, preferences = {} } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const query = `
      INSERT INTO users (email, password, first_name, last_name, preferences)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, first_name, last_name, preferences, created_at
    `;
    
    const values = [email, hashedPassword, firstName, lastName, JSON.stringify(preferences)];
    const result = await pool.query(query, values);
    
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT id, email, first_name, last_name, preferences, created_at, updated_at
      FROM users WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateById(id, updateData) {
    const { firstName, lastName, preferences } = updateData;
    const query = `
      UPDATE users 
      SET first_name = $1, last_name = $2, preferences = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING id, email, first_name, last_name, preferences, updated_at
    `;
    
    const values = [firstName, lastName, JSON.stringify(preferences), id];
    const result = await pool.query(query, values);
    
    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updatePassword(id, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    const query = `
      UPDATE users 
      SET password = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `;
    
    await pool.query(query, [hashedPassword, id]);
  }
}

export default User;