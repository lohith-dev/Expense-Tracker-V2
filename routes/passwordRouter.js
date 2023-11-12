
const express = require('express');

const passController = require('../controllers/passController.js')

const router = express.Router();



router.post('/forgotpassword',passController.sendEmail);










module.exports = router;
