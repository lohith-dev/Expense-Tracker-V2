const path = require('path');

const express = require('express');

const expController = require('../controllers/expenseController.js');

const router = express.Router();

// /admin/add-product => GET 
router.get('/', expController.getappntdata);

router.get('/:id', expController.getSingleAppntData);

router.post('/', expController.postAppntdata);

router.put('/',expController.updAppntdata)

router.delete('/:id', expController.deleteAppntdata);



// /admin/products => GET




module.exports = router;
