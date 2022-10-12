const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

         res.status(200).json(newComment);
    } catch (err) {
        res.status(404).json(err);
    }
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
      return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(404).json(err);
    }
})

// update comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                content: req.params.content
            },
            {
                where: {
                    // the correct blog id must be selected, and the user logged in must ALSO have the correct user_id connected to this comment
                    id: req.params.id,
                    user_id: req.session.user_id
                },
            },
        );
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(404).json(err)
    }
});

module.exports = router;