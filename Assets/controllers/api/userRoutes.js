const router = require('express').Router();
const { User } = require('../../models');

// Route to CREATE a new user (add them to the database and log them in)
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body); // Where is the body coming from? FETCH request in public js file!

        req.session.save(() => {
            req.session.user_id = userData.id; // The id of this newly created user is also the session user_id !?
            req.session.logged_in = true; // Set logged_in as true when a new user is created!

            res.status(200).json(userData); // In public js, if response.ok, redirect user to homepage, or dashboard
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// Route to LOGIN an existing user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect username or password, please try again.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        
        if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect username or password, please try again.' });
            return;
        }

        // if password IS valid, log them in!
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            // include the user that was found with the provided username
            res.json({ user: userData, message: 'You are now logged in!' });
          });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to LOGOUT a user
// simply going to this route triggers the action defined below
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // destroy the current session
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;