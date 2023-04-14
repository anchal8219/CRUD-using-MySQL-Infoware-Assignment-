const router = require("express").Router();
const emp = require("../controllers/employee");

// Retrieve all employees
router.get('/empDetail', emp.get);

// List all employees using pagination
router.get('/empDetail', emp.getPage)

// Retrieve a single employee with id
router.get('/empDetail/:id', emp.findById);

// Create a new employee
router.post('/empDetail', emp.create);

// Update a employee 
router.patch('/employee', emp.update_patch);

router.put('/employee', emp.update_put);


// Delete a employee with id
router.delete('/employee/:id', emp.delete);


module.exports = router;