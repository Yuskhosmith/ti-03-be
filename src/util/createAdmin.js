const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));


const createAdmin = async () => {
  try {
    const username = 'admin';
    const email = 'admin@example.com';
    const password = 'admin123'; 
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
      const adminPermissions = await Permission.find({ name: { $in: ['create_content', 'read_content', 'update_content', 'delete_content'] } });
      adminRole = await Role.create({
        name: 'Admin',
        permissions: adminPermissions.map(p => p._id)
      });
      console.log('Admin role created');
    }

    const newAdmin = await User.create({
      username,
      email,
      password: hashedPassword,
      roles: [adminRole._id],
    });

    console.log('Admin user created successfully', newAdmin);
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
