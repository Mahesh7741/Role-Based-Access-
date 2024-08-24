function admin(req, res, next) {
    try {
      const userRole = req.user.role; // Access role from decoded JWT token
  
      if (!userRole) {
        return res.status(500).json({ message: "Role information is missing" });
      }
  
      if (userRole =="admin") {
        // User has admin role, allow access
        return next();
      } else {
        return res.status(403).json({ message: "Access denied: Admins only" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Server error during role verification" });
    }
  }
  
  module.exports = {
    admin
  };
  