const {validationResult} = require('express-validator');
const ResponseData = require('../utils/ResponseData');
const Model = require('../models');
const ConstantsModel = Model.constants;

const setConstants = async(req,res)=>{
    try{
        const {mode, type, key, value, parent, parentValue, id } = req.body;
        let constants ;
        if(mode == 'edit'){
            constants = await ConstantsModel.update({where:{id}},{key, value, parent, parentValue, type});
        }
        else{
            constants = await ConstantsModel.create({
                key, value, type, parent, parentValue
            });
        }
        ResponseData.ok(res,'',constants);
    }
    catch(err){
        console.log(err)
        ResponseData.error(res,'',err)
    }
}

module.exports = {
    setConstants
}