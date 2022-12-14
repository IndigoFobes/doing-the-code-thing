const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    // on delete CASCADE? (if I delete a USER, delete their posts)
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});



module.exports = { User, Blog, Comment };