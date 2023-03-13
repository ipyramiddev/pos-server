const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Category = sequelize.define("category",
        {
            orderno: {
                type: DataTypes.INTEGER,
                default: 0,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            description: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            total: {
                type: DataTypes.INTEGER,
            },
            parentCategory: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            created: {
                type: DataTypes.DATE,
                defaultValue: new Date()
            },
            updated: {
                type: DataTypes.DATE,
                defaultValue: new Date()
            },
            user: {
                type: DataTypes.INTEGER,

            }
        },
        {
            timestamps: false,

        },

    );
    return Category;
};