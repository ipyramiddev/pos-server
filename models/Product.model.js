
const {DataTypes,Deferrable} = require('sequelize');
const Category = require('./Category.model');

module.exports = (sequelize) => {
    const Product = sequelize.define("product", 
        {
            productId:{
                type:DataTypes.INTEGER,
                defaultValue:0,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue:"",
            },
            mainCategory:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            category:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            brand:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            description:{
                type:DataTypes.TEXT,
                defaultValue:''
            },
            keywords:{
                type:DataTypes.TEXT,
                defaultValue:''
            },
            variant:{
                type:DataTypes.STRING,
                defaultValue:'regular',
            },
            price:{
                type:DataTypes.FLOAT(11,4),
                defaultValue:0,
            },
            capitalPrice:{
                type:DataTypes.FLOAT(11,4),
                defaultValue:0,
            },
            quantity:{
                type:DataTypes.INTEGER,
                defaultValue:0,
            },

            image:{
                type:DataTypes.STRING,
                defaultValue:'/uploads/images/product-empty.png'
            },
            active:{
                type:DataTypes.BOOLEAN,
                defaultValue:true,
            },
            favorite:{
                type:DataTypes.BOOLEAN,
                defaultValue:false,
            },
            barcode:{
                type:DataTypes.STRING,
                defaultValue:'',
            },

            created:{
                type:DataTypes.DATE,
                defaultValue:new Date()
            },
            updated:{
                type:DataTypes.DATE,
                defaultValue:new Date()
            },
            user:{
                type:DataTypes.INTEGER,
                
            },
            minStock:{
                type:DataTypes.FLOAT(11,4),
                defaultValue:1
            },
            notifyMinStock:{
                type:DataTypes.BOOLEAN,
                defaultValue:false,
            },
            offlineStock:{
                type:DataTypes.INTEGER,
                defaultValue:-1,
            },
            onlineStock:{
                type:DataTypes.INTEGER,
                defaultValue:-1,
            },
            units:{
                type:DataTypes.INTEGER,
            }
        },
        {
            timestamps:false,

        }
    );

    // class ProductClass extends Product {}

    // ProductClass.init({
    //     mainCategoryId:{
    //         model:Category,
    //         key:'id',
    //         deferrable: Deferrable.INITIALLY_IMMEDIATE
    //     },
    //     categoryId:{
    //         model:Category,
    //         key:'id',
    //         deferrable: Deferrable.INITIALLY_IMMEDIATE
    //     },
    // })
    return Product;
};