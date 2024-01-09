const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin-controller');
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route('/users').get(authMiddleware,adminMiddleware,adminControllers.getAllUsers);
router.route('/contacts').get(authMiddleware,adminMiddleware,adminControllers.getAllContacts);
router.route('/user/:id').get(authMiddleware, adminMiddleware, adminControllers.getUserById);
router.route('/contact/:id').get(authMiddleware, adminMiddleware, adminControllers.getContactById);
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, adminControllers.deleteUserById);
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, adminControllers.deleteContactById);
router.route('/users/edit/:id').put(authMiddleware, adminMiddleware, adminControllers.updateUserById);
router.route('/contacts/edit/:id').put(authMiddleware, adminMiddleware, adminControllers.updateContactById);
module.exports = router;