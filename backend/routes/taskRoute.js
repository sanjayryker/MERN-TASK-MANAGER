const express = require('express')
const router = express.Router()
const { getTasks,createTask, getTask, deleteTask } = require('../controllers/taskController')

router.post("/api/tasks",createTask)

router.get("/api/tasks", getTasks)

router.get("/api/tasks/:id",getTask)

router.delete("/api/tasks/:id",deleteTask)

module.exports = router