const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

router.post("/signup", UserController.createUser );
router.post("/login", UserController.login);
router.post("/isUserExists", UserController.isUserExists);
router.get("/isUserExistByUserName", UserController.isUserExistsByUserName);
router.post("/isUserExistByEmail", UserController.isUserExistsByEmail);
module.exports = router;