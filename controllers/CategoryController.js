const {validationResult} = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const Model = require('../models');
const CategoryModel = Model.category;

const getAllCategories = async(req,res)=>{
    try{
        const categories = await CategoryModel.findAll({
            where:{active:true}, 
            order:[['parentCategory','asc'],['orderno','asc']]
        });
        ResponseData.ok(res,'',categories);
    }
    catch(err){
        console.log(err)
        ResponseData.error(res,'',err)
    }
}

module.exports = {
    getAllCategories
}