const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["incomplete", "completed"], 
      default: "incomplete",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: [{
      type: String,
      trim: true
    }],
    
    notes: [
      {
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      }
    ],
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  { versionKey: false , timestamps : true}
);

const Task = new mongoose.model("Task", todoSchema);

module.exports = Task;
