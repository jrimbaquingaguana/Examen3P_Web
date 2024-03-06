import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date, topics } = req.body;
    
    // Verificar si hay temas duplicados
    const uniqueTopics = [...new Set(topics)];

    if (uniqueTopics.length !== topics.length) {
      return res.status(400).json({ message: "Please provide unique topics" });
    }

    const newTask = new Task({
      title,
      description,
      date,
      topics: uniqueTopics,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, date, topics } = req.body;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date, topics },
      { new: true }
    );
    if (!taskUpdated) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};


export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
