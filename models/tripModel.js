// import pool from '../config/database.js';

// export class Trip {
//   static async create(tripData) {
//     const { user_id, destination, start_date, end_date, purpose, notes } = tripData;
    
//     const query = `
//       INSERT INTO trips (user_id, destination, start_date, end_date, purpose, notes)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING *
//     `;
    
//     const result = await pool.query(query, [user_id, destination, start_date, end_date, purpose, notes]);
//     return result.rows[0];
//   }

//   static async findByUserId(userId) {
//     const query = `
//       SELECT * FROM trips 
//       WHERE user_id = $1 
//       ORDER BY start_date DESC
//     `;
    
//     const result = await pool.query(query, [userId]);
//     return result.rows;
//   }

//   static async findById(id, userId) {
//     const query = `
//       SELECT * FROM trips 
//       WHERE id = $1 AND user_id = $2
//     `;
    
//     const result = await pool.query(query, [id, userId]);
//     return result.rows[0];
//   }

//   static async update(id, userId, tripData) {
//     const { destination, start_date, end_date, purpose, notes } = tripData;
    
//     const query = `
//       UPDATE trips 
//       SET destination = $1, start_date = $2, end_date = $3, 
//           purpose = $4, notes = $5, updated_at = CURRENT_TIMESTAMP
//       WHERE id = $6 AND user_id = $7
//       RETURNING *
//     `;
    
//     const result = await pool.query(query, [destination, start_date, end_date, purpose, notes, id, userId]);
//     return result.rows[0];
//   }

//   static async delete(id, userId) {
//     const query = 'DELETE FROM trips WHERE id = $1 AND user_id = $2 RETURNING *';
//     const result = await pool.query(query, [id, userId]);
//     return result.rows[0];
//   }

//   static async getUpcoming(userId) {
//     const query = `
//       SELECT * FROM trips 
//       WHERE user_id = $1 AND start_date >= CURRENT_DATE
//       ORDER BY start_date ASC
//     `;
    
//     const result = await pool.query(query, [userId]);
//     return result.rows;
//   }
// }