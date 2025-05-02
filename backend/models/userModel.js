const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Generate JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
};

// Compare user password
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
userSchema.methods.getResetToken = function () {
    const token = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

    return token;
};

const model = mongoose.model('User', userSchema);

module.exports = model;