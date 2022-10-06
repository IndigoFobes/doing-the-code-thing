const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
    try {
        // This is the homepage... I want to see navigation bar, existing blog posts, and login options
        // Get all blogs from database, along with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });

        // render received data ^ to homepage template!
        res.render('homepage')
    }
    catch (err) {

    }
})


// Login route
router.get('/login', async (req, res) => {
    try {

    }
    catch (err) {

    }
})