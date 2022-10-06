const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {};

Blog.init (
    {
        // blog id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // blog title
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            // **TODO: max characters
        },
        // blog contents
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
            // Any constraints?
        },
    },
    {
        sequelize,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog'
    }
);

module.exports = Blog