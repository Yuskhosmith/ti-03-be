const mongoose = require('mongoose');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for seeding.');
    const permissions = ['create_content', 'read_content', 'update_content', 'delete_content'];

    for (const name of permissions) {
      const existingPermission = await Permission.findOne({ name });
      if (!existingPermission) {
        await Permission.create({ name, description: `Allows user to ${name.replace('_', ' ')}` });
      }
    }

    console.log('Permissions seeded successfully.');

    const existingRole = await Role.findOne({ name: 'User' });
    if (!existingRole) {
      const readPermission = await Permission.findOne({ name: 'read_content' });
      await Role.create({ name: 'User', permissions: [readPermission._id] });
    }

    console.log('Roles seeded successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = seedDatabase;
