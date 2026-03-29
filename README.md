Task Manager REST API
Project Overview

A simple REST API to manage tasks with features to create, read, update, and delete tasks.
Built with Node.js, Express, and MySQL, with input validation, error handling, and pagination.

Technical Stack
Backend: Node.js + Express
Database: MySQL
Validation & Error Handling: Checks for title, description, and allowed status values
Bonus Features: Pagination implemented
Setup Instructions
Clone the repository
git clone https://github.com/Ruvanthika6/taskmanager-api.git
cd taskmanager-api
Install dependencies
npm install
Create .env file (in the root folder)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_manager
PORT=3000
Start the server
node server.js



API Endpoints
1. Create Task
POST /tasks
Body:
{
  "title": "Task title",
  "description": "Task description"
}
Response:
{
  "message": "Task created",
  "id": 1
}
2. Get Tasks (with Pagination)
GET /tasks?page=1&limit=5
Default: page=1, limit=5
Response:
{
  "page": 1,
  "limit": 5,
  "data": [
    {
      "id": 1,
      "title": "Test",
      "description": "First task",
      "status": "pending",
      "created_at": "2026-03-29T07:16:33.000Z"
    }
  ]
}
3. Update Task Status
PUT /tasks/:id
Body:
{
  "status": "completed"
}
Response:
{
  "message": "Task updated"
}
4. Delete Task
DELETE /tasks/:id
Response:
{
  "message": "Task deleted"
}
Database Schema

Database: task_manager
Table: tasks

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Testing
Use Postman or cURL to test endpoints
Example with cURL:
curl -X GET http://localhost:3000/tasks
Notes
Input Validation:
title must be at least 3 characters
description max 500 characters
status must be pending or completed
Pagination: Optional page and limit query parameters
Error Handling: Proper HTTP status codes and messages for invalid inputs