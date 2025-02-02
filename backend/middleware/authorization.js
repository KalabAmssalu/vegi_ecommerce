import rolesPermissions from "../utils/rolesPermissions.js"; // Import the permissions configuration

const authorize = (resource, action) => {
  return (req, res, next) => {
    const user = req.user; // Extract the authenticated user from the request object (set by `auth` middleware)
    console.log("resource access", resource, "action req", action, "user role", user.role);

    if (!user || !user.role) {
      return res.status(403).json({ msg: "Access denied: No roles found" });
    }

    // Check if the user has the required permission
    const hasPermission = user.role.some((role) => {
      const rolePermissions = rolesPermissions[role]?.resources?.[resource];
      console.log("rolePermissions", rolePermissions);
      return rolePermissions && rolePermissions.includes(action);
    });

    if (!hasPermission) {
      return res
        .status(403)
        .json({
          msg: `Access denied: You do not have permission to ${action} on ${resource}`,
        });
    }

    next(); // Proceed to the next middleware or route handler
  };
};

export default authorize;
