const db = require('../config/db');

const EmployeeModel = {
  async create({ name, department, email }) {
    const query = `
      INSERT INTO employees (name, department, email)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, department, email];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async findById(id) {
    const query = 'SELECT * FROM employees WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM employees WHERE email = $1;';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }
};

module.exports = EmployeeModel;