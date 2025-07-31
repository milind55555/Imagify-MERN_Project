import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    // Extract the Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Check for Bearer token format
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid token format' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database to ensure they exist
    const user = await userModel.findById(decoded.id).select('_id name email');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Attach user to request for downstream use
    req.user = user;
    req.userId = user._id; // Optional: for compatibility with controllers expecting userId

    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token' });
  }
};

export default authUser;