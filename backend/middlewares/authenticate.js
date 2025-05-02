const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('Login first to handle this resource', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log decoded token to check if it's valid
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error("Token verification error: ", error);
        return next(new ErrorHandler('Token is not valid', 401));
    }
});

exports.authorizeRoles = (...roles) => {
   return  (req, res, next) => {
        console.log('authorizeRoles - req.user:', req.user);
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next()
    }
}   