const express = require('express');
const router = express.Router();

// conroller
const authController = require("../controllers/authController")


// login routes
router.get("/login", authController.protectAuthRoutes, authController.loginGet);
router.post("/login", authController.protectAuthRoutes, authController.loginPost);

// registration routes
router.get("/register", authController.protectAuthRoutes, authController.registerGet);
router.post("/register", authController.registerPost, authController.registerPost);


module.exports = router