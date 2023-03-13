const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const License = sequelize.define("license",
        {
            license: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            description: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            created: {
                type: DataTypes.DATE,
                defaultValue: new Date()
            },
            expired: {
                type: DataTypes.INTEGER,
            },
            user: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: false,
        },
    );
    return License;
};