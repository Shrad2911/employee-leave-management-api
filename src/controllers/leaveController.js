const LeaveService = require('../services/leaveService');

const LeaveController = {
  async applyLeave(req, res, next) {
    try {
      const leave = await LeaveService.applyLeave(req.body);
      res.status(201).json({
        success: true,
        data: leave
      });
    } catch (error) {
      next(error);
    }
  },

  async getLeaves(req, res, next) {
    try {
      const { employee_id, status } = req.query;
      const leaves = await LeaveService.getLeaves({ employee_id, status });
      res.status(200).json({
        success: true,
        count: leaves.length,
        data: leaves
      });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedLeave = await LeaveService.updateLeaveStatus(id, status);
      res.status(200).json({
        success: true,
        data: updatedLeave
      });
    } catch (error) {
      next(error);
    }
  },

  async getSummary(req, res, next) {
    try {
      const { employee_id } = req.params;
      const summary = await LeaveService.getLeaveSummary(employee_id);
      res.status(200).json({
        success: true,
        employee_id: Number(employee_id),
        summary
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = LeaveController;