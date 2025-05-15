import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { username, email, password, fullName, dob } = req.body;
    const hashedPassword =bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password : hashedPassword,
      fullName,
      dob: new Date(dob)  // Convert string to Date object
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      error: err.message
    });
  }
};
