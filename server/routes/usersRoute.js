import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      res.send(result);
    } else {
      res.status(500).json('Error');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send('User Registered Succesfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
