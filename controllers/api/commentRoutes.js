// Import Express Router & Comment model
const router = require('express').Router()
const {Comment} = require ('../../models')

// POST route for comment
router.post('/', async (req, res) =>{
    try {
      // Adds a new comment with the user's input and associate it with the user's id
       const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
       })
       res.status(200).json(newComment) 
    } catch (err) {
      console.log(err)
        res.status(400).json(err)
    }
})

// DELETE route for comment
router.delete('/:id', async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;