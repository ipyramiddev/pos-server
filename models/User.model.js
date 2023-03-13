const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const User = sequelize.define("user",
        {
            role:{
                type:DataTypes.STRING,
                defaultValue:'user',
            },
            position:{
                type:DataTypes.STRING,
                defaultValue:'staff',
            },
            phone:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            password:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            avatar:{
                type:DataTypes.STRING,
                defaultValue:'avatar.jpg',
            },
            email:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            firstname:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            lastname:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            gender:{
                type:DataTypes.INTEGER,
                defaultValue:1,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            token:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            outlets:{
                type:DataTypes.STRING,
            },
            
        }
    );
    return User;
};