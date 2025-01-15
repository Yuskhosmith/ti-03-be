const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const adminController = require('../controllers/admin.controller')

router.get('/admin', authenticateJWT, authorizeRoles(['Admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

router.post('/assign-role', authenticateJWT,authorizeRoles(['Admin']), adminController.assignRoleToUser);

router.post('/assign-permission', authenticateJWT, authorizeRoles(['Admin']), adminController.assignPermissionToRole);

router.post('/group', authenticateJWT, authorizeRoles(['Admin']), adminController.createGroup);

router.post('/assign-group', authenticateJWT, authorizeRoles(['Admin']), adminController.assignUserToGroup);

module.exports = router;
