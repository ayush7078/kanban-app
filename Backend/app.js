const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/kanban", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/createtasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  await Task.findByIdAndUpdate(taskId, req.body);
  res.json({ message: "Task updated successfully" });
});

app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  await Task.findByIdAndDelete(taskId);
  res.status(204).json({ message: "Task deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
