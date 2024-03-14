const express = require('express');
const router = express.Router();

const CheckOutController = require('../controllers/CheckOutController/cartController')


router.post('/check-out',CheckOutController.updateStock)
//{cartArray} { "cartArray": [{Listing_id:"", Quantity: int},{Listing_id:"", Quantity: int}] }

module.exports=router;