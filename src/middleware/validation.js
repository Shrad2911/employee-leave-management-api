const validateEmployee = (req, res, next) => {
  const { name, department, email } = req.body;

  if (!name || !department || !email) {
    return res.status(400).json({ success: false, message: 'name, department, and email are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format.' });
  }

  next();
};

const validateLeave = (req, res, next) => {
  const { employee_id, leave_type, from_date, to_date } = req.body;

  if (!employee_id || !leave_type || !from_date || !to_date) {
    return res.status(400).json({
      success: false,
      message: 'employee_id, leave_type, from_date, and to_date are required.'
    });
  }

  next();
};

const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ['approved', 'rejected'];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be either 'approved' or 'rejected'."
    });
  }

  next();
};

module.exports = {
  validateEmployee,
  validateLeave,
  validateStatusUpdate
};