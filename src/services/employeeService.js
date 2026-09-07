const EmployeeModel = require('../models/employeeModel');

const EmployeeService = {
  async createEmployee(data) {
    const existing = await EmployeeModel.findByEmail(data.email);
    if (existing) {
      const error = new Error('Employee with this email already exists.');
      error.statusCode = 400;
      throw error;
    }
    return await EmployeeModel.create(data);
  }
};

module.exports = EmployeeService;