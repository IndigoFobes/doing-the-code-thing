const router = require('express').Router();
const { User } = require('../../models');

// Route to CREATE a new user (add them to the database and log them in)
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body); // Where is the body coming from? FETCH request in public js file!

        req.session.save(() => {
            req.session.user_id = userData.id; // The id of this newly created user is also the session id?
            req.session.logged_in = true; // Set logged_in as true when a new user is created!

            res.status(200).json(userData); // In public js, if response.ok, redirect user to homepage, or dashboard
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// Route to LOGIN an existing user


// Route to LOGOUT a user

module.exports = router;