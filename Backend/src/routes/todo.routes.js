const express = require("express");
const {
  addNewTask,
  getTask,
  updateTask,
  removeTask,
  addNoteToTask
} = require("../controlers/todo");
const { auth } = require("../middelware/auth");
const { chackAccess } = require("../middelware/chackAccess");

const todoRouter = express.Router()

// add a new task
todoRouter.post("/" ,auth, addNewTask)

// get authenticated user Task 
todoRouter.get("/" ,auth,chackAccess("Admin"), getTask)


// edit a task
todoRouter.patch("/:taskId" ,auth, updateTask)

// remove task
todoRouter.delete("/:taskId", auth, removeTask);

// add a note to a task
todoRouter.post("/:taskId/notes", auth, addNoteToTask);

module.exports = todoRouter