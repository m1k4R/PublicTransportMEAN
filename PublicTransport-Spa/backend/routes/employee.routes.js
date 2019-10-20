const express = require('express');
const router = express.Router();

const employee = require('../controllers/employee.controllers');

router.get('/', employee.getEmployees);
router.post('/', employee.createEmployee);
router.get('/:id', employee.getEmployee);
router.put('/:id', employee.editEmployee);
router.delete('/:id', employee.deleteEmployee);

module.exports = router;
