const express = require("express");
const {
  addNewTask,
  getTask,
  updateTask,
  removeTask,
  addNoteToTask,
  getAssignedTask
} = require("../controlers/todo");
const { auth } = require("../middelware/auth");
const { chackAccess } = require("../middelware/chackAccess");

const todoRouter = express.Router()

// add a new task
todoRouter.post("/" ,auth, addNewTask)

// get authenticated user Task 
todoRouter.get("/" ,auth,chackAccess("Admin"), getTask)

// get mansned user Task 
todoRouter.get("/assigned" ,auth,chackAccess("teammember"), getAssignedTask)



// edit a task
todoRouter.patch("/:taskId" ,auth, updateTask)

// remove task
todoRouter.delete("/:taskId", auth, removeTask);

// add a note to a task
todoRouter.post("/:taskId/notes", auth, addNoteToTask);

module.exports = todoRouter