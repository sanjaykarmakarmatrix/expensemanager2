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

    // Group registration
    router.post("/group/create-group", groupController.createGroup);

    // Group list
    router.get("/group/list", groupController.groupList);

    // Group details
    router.get("/group/details/:id", groupController.groupDetails);

    // Matched user list (autocomplete)
    router.post("/user/search-list", userController.searchedUserList);
});

module.exports = router;