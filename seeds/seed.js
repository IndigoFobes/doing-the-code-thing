const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // seed users with userData.json
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // seed blogs
    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id, // Don't know if this is what I need here. ***
        })
    }

    process.exit(0);
};

// called on node run seed
seedDatabase();
