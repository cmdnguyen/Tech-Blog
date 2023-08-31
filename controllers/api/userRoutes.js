// Import Express Router & User Model
const router = require('express').Router();
const { User } = require('../../models');

// POST route to create user
router.post('/', async (req, res) => {
  try {
    // Takes user input to create a user
    const userData = await User.create({
      ...req.body
      
    });
    // When the user is created, it will logged the user in
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// POST Route to login
router.post('/login', async (req, res) => {
  try {
    // Finds the username in the database. If not, throws error
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    // Checks the password associated with the username. If not, throws error
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    // If username and password is validated, it will save the session and logs the user in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route to logout
router.post('/logout', (req, res) => {
  try {
    // If the user is logged in, it will destory the session cookie
    if (req.session.logged_in) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(204).end();
        }
      });
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
} catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
