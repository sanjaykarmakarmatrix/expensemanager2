'use strict';

const express = require('express');
const router = express.Router();

require('express-group-routes');

const userController = require('../controllers/UserController');
const groupController = require('../controllers/GroupController');

router.group('/api', (router) => {
    // Login
    router.post('/login', userController.userLogin);

    // User registration
    router.post("/register", userController.userRegistration);

    // User registration
    router.post("/group/create-group", groupController.createGroup);
});

module.exports = router;