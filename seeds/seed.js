const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n')

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SEEDED -----\n')

  for (const post of postData) {
  await Post.create({
      ...post,
    });
  }
  console.log('\n----- POSTS SEEDED -----\n')

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    })
  }
  console.log('\n----- COMMENTS SEEDED -----\n')

  process.exit(0);
};

seedDatabase();
