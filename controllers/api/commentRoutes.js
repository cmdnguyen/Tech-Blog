const router = require('express').Router()
const {Comment, Post} = require ('../../models')

router.post('/', async (req, res) =>{
    try {
      console.log("ADDING A COMMENT")
      console.log("Body")
       console.log(req.body)
      

       const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
       })
       console.log("new comment")
       console.log(newComment)
       res.status(200).json(newComment) 
    } catch (err) {
      console.log(err)
        res.status(400).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No blog post found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const commentData = await Comment.findAll()
      return res.json(commentData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  });

  module.exports = router;