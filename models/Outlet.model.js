const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const Outlet = sequelize.define("outlet",
        {
            name:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            type:{
                type:DataTypes.INTEGER,

            },
            phone:{
                type:DataTypes.INTEGER,
            },
            country:{
                type:DataTypes.INTEGER,
            },
            address:{
                type:DataTypes.STRING,
                defaultValue:'',
            },
            district:{
                type:DataTypes.INTEGER,
            },
            zip:{
                type:DataTypes.STRING,
                defaultValue:''
            },
            latitude:{
                type:DataTypes.FLOAT(14,10),
                
            },
            longtitude:{
                type:DataTypes.FLOAT(14,10),
            },
            owner:{
                type:DataTypes.INTEGER,
            },
            image:{
                type:DataTypes.STRING,
                defaultValue:'/uploads/images/outlet-empty.png'
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            
        }
    );
    return Outlet;
};