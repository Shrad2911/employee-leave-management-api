const express = require('express');
const router = express.Router();
const LeaveController = require('../controllers/leaveController');
const { validateLeave, validateStatusUpdate } = require('../middleware/validation');

router.post('/', validateLeave, LeaveController.applyLeave);
router.get('/', LeaveController.getLeaves);
router.patch('/:id/status', validateStatusUpdate, LeaveController.updateStatus);
router.get('/summary/:employee_id', LeaveController.getSummary);

module.exports = router;