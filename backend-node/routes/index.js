const express = require("express");
const router = express.Router();

const focusController = require("../controller/focus");

router.get('/getcount',focusController.getCount);
router.post('/setcount',focusController.setCount);

module.exports = router;