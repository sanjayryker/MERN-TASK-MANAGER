const express = require('express')
const router = express.Router()
const { getTasks,createTask, getTask, deleteTask, updateTask } = require('../controllers/taskController')

 /*     router.post("/",createTask)
        router.get("/", getTasks)
        router.get("/:id",getTask)
        router.delete("/:id",deleteTask)
        router.put("/:id",updateTask)        */


router.route("/")
.get(getTasks)
.post(createTask)

router.route("/:id")
.get(getTask)
.delete(deleteTask)
.put(updateTask)


module.exports = router