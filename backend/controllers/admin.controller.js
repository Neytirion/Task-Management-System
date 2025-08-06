import User from '../models/user.model.js';
import Task from '../models/task.model.js';

// Получить всех пользователей с их задачами
export const getAllUsersWithTasks = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // не отдавать пароли
    const usersWithTasks = await Promise.all(
      users.map(async (user) => {
        const tasks = await Task.find({ userId: user._id });
        return { user, tasks };
      })
    );
    res.json(usersWithTasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Удалить пользователя и все его задачи
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Task.deleteMany({ userId: id });

    res.json({ message: 'User and tasks deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
