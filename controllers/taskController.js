const db = require('../config/db');

console.log("TASK CONTROLLER FILE LOADED");

// ✅ CREATE TASK
exports.createTask = (req, res) => {
  const { title, description } = req.body;

  // ✅ Validation
  if (!title || title.trim().length < 3) {
    return res.status(400).json({
      error: "Title must be at least 3 characters"
    });
  }

  if (description && description.length > 500) {
    return res.status(400).json({
      error: "Description too long (max 500 characters)"
    });
  }

  const query = "INSERT INTO tasks (title, description) VALUES (?, ?)";
  db.query(query, [title, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Task created",
      id: result.insertId
    });
  });
};

// ✅ GET TASKS WITH PAGINATION, TOTALS, AND SORTING
exports.getTasks = (req, res) => {
  console.log("GET TASKS HIT");

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  // Step 1: Get total number of tasks
  const countQuery = "SELECT COUNT(*) AS total FROM tasks";
  db.query(countQuery, (err, countResult) => {
    if (err) {
      console.error("DB COUNT ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    const totalTasks = countResult[0].total;
    const totalPages = Math.ceil(totalTasks / limit);

    // Step 2: Get paginated tasks, sorted by latest first
    const query = "SELECT * FROM tasks ORDER BY created_at DESC LIMIT ? OFFSET ?";
    db.query(query, [limit, offset], (err, results) => {
      if (err) {
        console.error("DB FETCH ERROR:", err);
        return res.status(500).json({ error: err.message });
      }

      res.json({
        page,
        limit,
        totalTasks,
        totalPages,
        data: results
      });
    });
  });
};

// ✅ UPDATE TASK STATUS
exports.updateTask = (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;

  const allowedStatus = ["pending", "completed"];
  if (!status || !allowedStatus.includes(status)) {
    return res.status(400).json({
      error: "Status must be 'pending' or 'completed'"
    });
  }

  const query = "UPDATE tasks SET status=? WHERE id=?";
  db.query(query, [status, taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task updated"
    });
  });
};

// ✅ DELETE TASK
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;

  const query = "DELETE FROM tasks WHERE id=?";
  db.query(query, [taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task deleted"
    });
  });
};