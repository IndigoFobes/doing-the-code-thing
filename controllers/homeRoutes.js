const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const { truncate } = require('../models/User');
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
                {
                    model: Comment,
                    attributes: ['user_id', 'content']
                },
            ],
        });

        // Serialize data; Make it an array of individual posts
        const blogPosts = blogData.map((blogPost) => blogPost.get({ plain: true }));

        // render received data ^ to homepage template!
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in // TODO*** Why logged in? When does auth come into play?
        });
    }
    catch (err) {
        res.status(500).json(err);  
    }
});

// Dashboard route; use withAuth to prevent access from anyone who is not logged in ***
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Get all blogs (along with comments) by the logged in user. Is this method correct??***
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id, // or author: req.params.author ?
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['user_id', 'content']
                }
            ]
        });

        // Serialize data
        const userBlogs = blogData.map((userBlog) => userBlog.get({ plain: true }));

        // render this data to dashboard.handlebars template!
        res.render('dashboard', {
            userBlogs,
            logged_in: true,
        });
    }
    catch (err) {
        res.status(500).json(err);  
    }
});

// route to newPost page
router.get('/newPost', withAuth, (req, res) => {
   res.render('newPost', {
    logged_in: true,
   });
})

// Login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage'); 
        return;
      }
      res.render('login');
});

module.exports = router;