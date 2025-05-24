import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifytoken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    console.log('=== TOKEN VERIFICATION DEBUG ===');
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header found');
      return next(errorHandler(401, 'Access denied. No token provided.'));
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log('Token extracted:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.log('Token is empty after extraction');
      return next(errorHandler(401, 'Access denied. No token provided.'));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      exp: decoded.exp ? new Date(decoded.exp * 1000) : 'No expiration'
    });

    // Set user information in request object
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role // Make sure role is included
    };

    console.log('User set in req.user:', req.user);
    console.log('================================');
    
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return next(errorHandler(401, 'Token has expired. Please login again.'));
    } else if (error.name === 'JsonWebTokenError') {
      return next(errorHandler(401, 'Invalid token. Please login again.'));
    } else {
      return next(errorHandler(401, 'Token verification failed.'));
    }
  }
};