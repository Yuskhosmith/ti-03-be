const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required: email, password.' });
    }

    const user = await User.findOne({ email }).select('+password').populate('roles');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const payload = { userId: user._id, roles: user.roles.map(role => role.name) };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required: username, email, password.' });
    }

    const existingUseByEmail = await User.findOne({ email });
    if (existingUseByEmail) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const existingUseByUsername= await User.findOne({ username });
    if (existingUseByUsername) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let defaultRole = await Role.findOne({ name: 'User' });
    if (!defaultRole) {
      const defaultPermissions = await Permission.find({ name: { $in: ['read_content'] } });
      defaultRole = await Role.create({
        name: 'User',
        permissions: defaultPermissions.map(p => p._id)
      });
    }

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      roles: [defaultRole._id]
    });
    const userResponse = { ...newUser._doc };
    delete userResponse.password;

    res.status(201).json({ message: 'User registered successfully', user: userResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};