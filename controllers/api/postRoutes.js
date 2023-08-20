//localhost:3001/api/posts
const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log("ADDING A POST")
    console.log(req.body)
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

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

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id)
    return res.json(postData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll()
    return res.json(postData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
