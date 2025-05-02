// Existing imports and middlewares
const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, "config/config.env")});

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

// Mount Routes
app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);

// Serve frontend build files if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}

// ADD GLOBAL 404 ROUTE HERE
app.all('*', (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error Middleware (keep it at the end always)
app.use(errorMiddleware);

module.exports = app;
