const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');
const { validateEmployee } = require('../middleware/validation');

router.post('/', validateEmployee, EmployeeController.createEmployee);

module.exports = router;