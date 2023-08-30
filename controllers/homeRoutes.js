//Import Express Router, Models and withAuth
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//GET route for homepage
router.get('/', async (req, res) => {
  //finds the posts in the database
  try {
    const postData = await Post.findAll({
      include: [{model: User}],
    });
    //Gets the posts and renders it in the homepage
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      logged_in: req.session.logged_in,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route for login page
router.get('/login', async (req, res) => {
  // If logged in, redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // renders login page
  res.render('login');
});

// GET route for dashboard, requires users to be logged in
router.get('/dashboard', withAuth, async (req, res) => {
  // If not logged in, redirect to login page
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  // Finds the logged-in user in the database including the Post model
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{model: Post}]
    })
    const user = userData.get({plain: true})

    //Finds the posts from the logged in user
    const postData = await Post.findAll({
      where:{user_id:req.session.user_id},
      include: [{model: User}],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
  // If logged in, rendered Dashboard
  res.render('dashboard', {
    logged_in: req.session.logged_in,
    posts, user
  });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

// GET route for logout
router.get('/logout', async (req, res) => {
  // If the user logs out, it will destroy the session and redirects to homepage
  try {
    if (req.session.logged_in) {
      await req.session.destroy();
      res.redirect('/');
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
  res.render('logout');
});

// GET route for posts by id, requires users to be logged in
router.get('/posts/:id', withAuth, async (req, res) => {
  // If not logged in, redirect to login page
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  try {
      //Finds the post by id and includes the User Model
    const postData = await Post.findByPk(req.params.id, {
      include: [{model: User}],
    });
    const post = postData.get({plain:true})
    
    // Finds the comments associated with the post and includes the Post & User model
    const commentData = await Comment.findAll({
      where: {post_id:req.params.id},
      include: [{model:Post}, {model:User}]
    })
    const comments = commentData.map((comment) => comment.get({plain:true}))

    // If the logged in user is the author of the post, the user can edit it
    var canEdit;
    if (post.user_id === req.session.user_id) {
      canEdit = true;
    }
    res.render('post', { post, canEdit, logged_in: req.session.logged_in, comments});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
