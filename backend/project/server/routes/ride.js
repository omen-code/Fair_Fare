import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get ride history
router.get('/history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user.recentRides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new ride
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.recentRides.push(req.body);
    await user.save();
    res.json(user.recentRides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;