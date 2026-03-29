const app = require('./app');

console.log("STEP 1");

// try requiring in variable
const db = require('./config/db.js');

console.log("STEP 2");

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});