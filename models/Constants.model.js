const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Constants = sequelize.define("constant", 
        {
            key:{type:DataTypes.STRING,defaultValue:''},
            value:{type:DataTypes.STRING,defaultValue:''},
            type:{type:DataTypes.STRING,defaultValue:'support-country'}, // support-country, business-type, sub-district, 
            parent:{type:DataTypes.STRING,},    // 
            user:{type:DataTypes.INTEGER, defaultValue:-1},
            parentValue:{type:DataTypes.STRING, defaultValue:''}
        },
        {timestamps:false}
         
    );
    return Constants;
};