const EmployeeService = require('../services/employeeService');

const EmployeeController = {
  async createEmployee(req, res, next) {
    try {
      const employee = await EmployeeService.createEmployee(req.body);
      res.status(201).json({
        success: true,
        data: employee
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = EmployeeController;