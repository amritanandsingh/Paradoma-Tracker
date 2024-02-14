const express = require("express");
const router = express.Router();


const userController = require("../controller/user")

router.post('/getcount',userController.fetchUserFocus);
router.post('/setcount',userController.createFocus);

router.post('/newUser' , userController.createUser);
router.get('/getUser' , userController.getUser);
router.get('/');

module.exports = router;