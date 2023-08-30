
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//homepage
router.get('/', async (req, res) => {
  console.log(req.session.user_id);
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

// Login page
router.get('/login', async (req, res) => {
  // If logged in, redirect to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // renders login page
  res.render('login');
});

// Dashboard page, requires users to be logged in
router.get('/dashboard', withAuth, async (req, res) => {
  // If not logged in, redirect to login page
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{model: Post}]
    })
    const user = userData.get({plain: true})

    //Gets the posts from the logged in user and renders it in the homepage
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

// Logout page
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
    console.error('Error during logout:', err);
    res.status(500).json(err);
  }
  res.render('logout');
});

// Posts by id page, requires users to be logged in
router.get('/posts/:id', withAuth, async (req, res) => {
  // If not logged in, redirect to login page
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  //Finds the post by id from the User Model
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{model: Post}, {model:Comment}]
    })
    const user = userData.get({plain: true})
    console.log("user data")
    console.log(user)
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {model: User},
        {model: Comment}
      ],
    });

    const post = postData.get({plain:true})
    
    const commentData = await Comment.findAll({
      where: {post_id:req.params.id},
      include: [{model:Post}, {model:User}]
    })
    const comments = commentData.map((comment) => comment.get({plain:true}))

    var canEdit;
    if (post.user_id === req.session.user_id) {
      canEdit = true;
    }
    res.render('post', { post, canEdit, logged_in: req.session.logged_in, comments, user});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
