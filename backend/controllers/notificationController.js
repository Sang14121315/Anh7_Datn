const NotificationService = require('../services/notificationService');
const Joi = require('joi');

const notificationSchema = Joi.object({
  user_id: Joi.string().required(),
  content: Joi.string().required(),
  read: Joi.boolean()
});

exports.getNotifications = async (req, res) => {
  try {
    const { user_id, read } = req.query;
    const filters = {};
    if (user_id) filters.user_id = user_id;
    if (read !== undefined) filters.read = read === 'true';

    const notifications = await NotificationService.getAll(filters);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching notifications' });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notification = await NotificationService.getById(req.params.id);
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching notification' });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { error } = notificationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const notification = await NotificationService.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating notification' });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { error } = notificationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const notification = await NotificationService.update(req.params.id, req.body);
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating notification' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    await NotificationService.delete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting notification' });
  }
};