import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add saved location
router.post('/locations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.savedLocations.push(req.body);
    await user.save();
    res.json(user.savedLocations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get wallet balance and transactions
router.get('/wallet', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user.wallet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add money to wallet
router.post('/wallet/add', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.userId);
    
    user.wallet.balance += amount;
    user.wallet.transactions.push({
      amount,
      type: 'credit',
      description: 'Added money to wallet'
    });
    
    await user.save();
    res.json(user.wallet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;