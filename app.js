const express = require('express');
const app = express();

app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send("API Running...");
});

// ✅ ADD HERE
app.get('/api/tasks', (req, res) => {
  console.log("DIRECT GET HIT");
  res.send("Direct route working");
});

module.exports = app;