const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

console.log("TASK ROUTES LOADED");

// ✅ THIS MUST EXIST
router.get('/', (req, res) => {
  console.log("ROUTE GET HIT");
  controller.getTasks(req, res);
});

router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;