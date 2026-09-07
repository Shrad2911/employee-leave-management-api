const LeaveModel = require('../models/leaveModel');
const EmployeeModel = require('../models/employeeModel');

const LeaveService = {
  async applyLeave(data) {
    const employeeExists = await EmployeeModel.findById(data.employee_id);
    if (!employeeExists) {
      const error = new Error('Employee not found.');
      error.statusCode = 404;
      throw error;
    }

    if (new Date(data.from_date) > new Date(data.to_date)) {
      const error = new Error('from_date cannot be later than to_date.');
      error.statusCode = 400;
      throw error;
    }

    return await LeaveModel.create(data);
  },

  async getLeaves(filters) {
    return await LeaveModel.findWithFilters(filters);
  },

  async updateLeaveStatus(id, status) {
    const leave = await LeaveModel.findById(id);
    if (!leave) {
      const error = new Error('Leave request not found.');
      error.statusCode = 404;
      throw error;
    }

    return await LeaveModel.updateStatus(id, status);
  },

  async getLeaveSummary(employee_id) {
    const employeeExists = await EmployeeModel.findById(employee_id);
    if (!employeeExists) {
      const error = new Error('Employee not found.');
      error.statusCode = 404;
      throw error;
    }

    const summary = await LeaveModel.getSummaryByEmployee(employee_id);
    
    // Format output cleanly into key-value pairs
    const result = {};
    summary.forEach(item => {
      result[item.leave_type] = item.total_leaves;
    });

    return result;
  }
};

module.exports = LeaveService;