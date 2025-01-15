const User = require('../models/user.model');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
const Group = require('../models/group.model');

exports.assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findById(userId);
    const role = await Role.findById(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: 'User or Role not found.' });
    }

    if (!user.roles.includes(role._id)) {
      user.roles.push(role._id);
      await user.save();
    }

    res.status(200).json({ message: 'Role assigned successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.assignPermissionToRole = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    const role = await Role.findById(roleId);
    const permission = await Permission.findById(permissionId);

    if (!role || !permission) {
      return res.status(404).json({ message: 'Role or Permission not found.' });
    }

    if (!role.permissions.includes(permission._id)) {
      role.permissions.push(permission._id);
      await role.save();
    }

    res.status(200).json({ message: 'Permission assigned successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name, description = '', permissionIds } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Group name is required.' });
    }

    const permissions = await Permission.find({ _id: { $in: permissionIds } });
    if (permissions.length !== permissionIds.length) {
      return res.status(400).json({ message: 'Some permissions are invalid.' });
    }

    const newGroup = await Group.create({
      name,
      description,
      permissions: permissionIds,
    });

    res.status(201).json({ message: 'Group created successfully.', group: newGroup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.assignUserToGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    const user = await User.findById(userId);
    const group = await Group.findById(groupId);

    if (!user || !group) {
      return res.status(404).json({ message: 'User or Group not found.' });
    }

    if (!group.users.includes(user._id)) {
      group.users.push(user._id);
      await group.save();
    }

    res.status(200).json({ message: 'User added to group successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};
