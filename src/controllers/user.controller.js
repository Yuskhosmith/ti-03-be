const User = require('../models/user.model');
const Role = require('../models/role.model');

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .populate({
        path: 'roles',
        populate: {
          path: 'permissions',
          select: 'name description -_id',
        },
      })

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User details fetched successfully.', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};
