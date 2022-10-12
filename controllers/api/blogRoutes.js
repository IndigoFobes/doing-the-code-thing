const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: Comment }, { model: User }]
        });
        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// post (new blog)
// *** does the route add to '/dashboard'?
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id, // What is this doing?
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete blog based on id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// put (update) blog route
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(
            {
                title: req.params.title,
                contents: req.params.contents,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                }
            },
        );
        if (!blogData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;


