const Todo = require("../models/Todo");
const User = require("../models/user")

// add a new task
const addNewTask = async (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    mentions
  } = req.body;

  try {
    const isAlreadyExist = await Todo.findOne({ title })
    if (isAlreadyExist) return res.status(400).json({ message: "can not add duplicate task!" })

    let mentionsArr = [];
    if (Array.isArray(mentions) && mentions.length > 0) {
      // Validate all mentioned users exist
      const users = await User.find({ _id: { $in: mentions } });
      if (users.length !== mentions.length) {
        return res.status(400).json({ message: "One or more mentioned users do not exist." });
      }
      mentionsArr = mentions;
    }

    const todo = new Todo({
      title,
      description,
      status,
      priority,
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      userId: req.user?.userId,
      mentions: mentionsArr
    });
    const newTaks = await todo.save();

    const io = req.app.get("socketio");

    mentionsArr.forEach((mansenUser) => {
      io.to(mansenUser).emit("taskAssigned", {
        taskId: newTaks._id,
        message: "You have been assigned a new task!",
      });
    })


    res.status(201).json({ message: "task added success", newTaks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getTask = async (req, res) => {
  const { status, priority, createdAt } = req.query

  const filter = { userId: req.user?.userId };

  if (status) {
    filter.status = status; // add status filter if provided
  }
  if (priority) {
    filter.priority = priority; // add priority filter if provided
  }
  if (createdAt) {
    filter.createdAt = createdAt; // add createdAt filter if provided
  }

  try {
    const yourTasks = await Todo.find(filter);

    res.json({ yourTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// edit task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.userId;
  try {
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (req.body.mentions && Array.isArray(req.body.mentions)) {
      // Validate all mentioned users exist
      const users = await User.find({ _id: { $in: req.body.mentions } });
      if (users.length !== req.body.mentions.length) {
        return res.status(400).json({ message: "One or more mentioned users do not exist." });
      }
    }
    const task = await Todo.findOneAndUpdate(
      { _id: taskId, userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task Not found" });
    res
      .status(201)
      .json({ message: "task updated success", updatedTask: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// delete task
const removeTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.userId;

  try {
    const task = await Todo.findOneAndDelete({ _id: taskId, userId });
    if (!task) return res.status(404).json({ message: "Task Not found" });
    res
      .status(201)
      .json({ message: "task removed success", removedTask: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// Add a note to a todo
const addNoteToTask = async (req, res) => {
  const { taskId } = req.params;
  const { text } = req.body;
  const userId = req.user.userId;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: 'Note text is required.' });
  }

  try {
    const todo = await Todo.findById(taskId);
    if (!todo) return res.status(404).json({ message: 'Task not found.' });

    const note = {
      text: text.trim(),
      author: userId,
      createdAt: new Date()
    };
    todo.notes.push(note);
    await todo.save();
    res.status(201).json({ message: 'Note added successfully.', note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addNewTask, getTask, updateTask, removeTask, addNoteToTask };
