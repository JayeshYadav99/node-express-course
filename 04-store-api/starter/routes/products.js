const express=require('express');
const router=express.Router();
const {getALLproducts,getALLProductsStatic}=require('../controllers/products');
router.route('/').get(getALLproducts);
router.route('/static').get(getALLProductsStatic);
module.exports=
    router;
