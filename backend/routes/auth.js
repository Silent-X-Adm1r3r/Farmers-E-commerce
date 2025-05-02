const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads/user'));
        },
        filename: function(req, file, cb) {
            // Adding a unique identifier (timestamp) to the file name
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});

const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/authController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

router.route('/register').post(upload.single('avatar'), registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/change').post(isAuthenticatedUser, changePassword);
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile);
router.route('/update').put(isAuthenticatedUser, upload.single('avatar'), updateProfile);

// Admin routes
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUser)
                                .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
                                .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
