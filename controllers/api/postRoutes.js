// Imports Express Router and Post model
const router = require('express').Router();
const { Post } = require('../../models');

// POST route for new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE route to delete a post by id
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route to update a post
router.put('/:id', async(req,res) =>{
  try {
    // Finds the post by id
    const postData = await Post.findByPk(req.params.id)

    // If there's no post data, throw error
    if(!postData){
      return res.status(404).json({error: 'Post not found'})
    // If there's postData, take the user input and update it
    } else {
    const updatedPost = req.body
    await postData.update(updatedPost)
    res.status(200).json(postData)
    }
  } catch (error) {
    res.status(500).json(err)
  }
})

module.exports = router;
