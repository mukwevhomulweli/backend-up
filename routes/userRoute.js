
const UserController = require("../controllers/UserController");

const router = require("express").Router();
router.post('/', UserController.create);
router.post('/sign', UserController.signInOTP)

module.exports = router;