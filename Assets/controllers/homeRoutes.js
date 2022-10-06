const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // This is the homepage... I want to see navigation bar, existing blog posts, and login options

        // render received data ^ to homepage template!
        res.render('homepage')
    }
    catch (err) {

    }
})