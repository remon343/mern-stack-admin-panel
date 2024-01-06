//Register and Login routes - Authentication Router
const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const signupSchema = require("../validators/auth-validator");

router.route("/").get(authControllers.home);

// You can follow the either way to write the routes
//router.get("/register",register)
router.route("/login").post(authControllers.login);
router.route("/register").post(validate(signupSchema),authControllers.register);
router.route('/user').get(authMiddleware,authControllers.user);
module.exports = router;
