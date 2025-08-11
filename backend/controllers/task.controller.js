import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.user.id});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({message: 'Server error'});
  }
};

export const createTask = async (req, res) => {
  try {
    const {title, description, status, priority, dueDate} = req.body;

    const newTask = new Task({
      userId: req.user.id,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({message: 'Server error'});
  }
};

export const updateTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Task.findOne({_id: id, userId: req.user.id});

    if (!task) return res.status(404).json({message: 'Task not found'});

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({message: 'Server error'});
  }
};

export const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Task.findOneAndDelete({_id: id, userId: req.user.id});
    if (!task) return res.status(404).json({message: 'Task not found'});

    res.json({message: 'Task deleted'});
  } catch (err) {
    res.status(500).json({message: 'Server error'});
  }
};
