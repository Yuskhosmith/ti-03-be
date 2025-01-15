exports.authorizeRoles = (allowedRoles) => (req, res, next) => {
  const userRoles = req.user?.roles;

  if (!userRoles || !allowedRoles.some((role) => userRoles.includes(role))) {
    return res
      .status(403)
      .json({ message: "Access denied. Insufficient permissions." });
  }

  next();
};
