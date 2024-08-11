const express = require('express');
const userController = require('./controllers/userController');
const expenseController = require('./controllers/expenseController');
const expenseTableController = require('./controllers/expenseTableController');
const sharedController = require('./controllers/sharedController');

const router = express.Router();

userController(router);
expenseController(router);
expenseTableController(router);
sharedController(router);

module.exports = router
