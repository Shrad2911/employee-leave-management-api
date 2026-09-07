const db = require('../config/db');

const LeaveModel = {
  async create({ employee_id, leave_type, from_date, to_date }) {
    const query = `
      INSERT INTO leaves (employee_id, leave_type, from_date, to_date, status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING *;
    `;
    const values = [employee_id, leave_type, from_date, to_date];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async findWithFilters({ employee_id, status }) {
    let query = 'SELECT * FROM leaves WHERE 1=1';
    const params = [];

    if (employee_id) {
      params.push(employee_id);
      query += ` AND employee_id = $${params.length}`;
    }

    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC;';
    const { rows } = await db.query(query, params);
    return rows;
  },

  async findById(id) {
    const query = 'SELECT * FROM leaves WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },

  async updateStatus(id, status) {
    const query = `
      UPDATE leaves
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const { rows } = await db.query(query, [status, id]);
    return rows[0];
  },

  async getSummaryByEmployee(employee_id) {
    const query = `
      SELECT leave_type, COUNT(*)::INT as total_leaves
      FROM leaves
      WHERE employee_id = $1 AND status = 'approved'
      GROUP BY leave_type;
    `;
    const { rows } = await db.query(query, [employee_id]);
    return rows;
  }
};

module.exports = LeaveModel;