const express = require('express');
const router = express.Router();
const postNewCommentController = require('../controllers/MainPageController/NewCommentController')
const getPhoneListController = require('../controllers/MainPageController/PhoneListController')
const searchController = require('../controllers/MainPageController/search')
const lowStockController = require('../controllers/MainPageController/lowstock')
const bestSellerController =require('../controllers/MainPageController/bestseller')

router.post('/post-new-comment',postNewCommentController.newComment)
//{User_id,Listing_id,Comment,Rating}

router.get('/get-phone-list',getPhoneListController.getPhoneList)

router.get('/search',searchController.search)
//{Title,Brand,Price}

router.get('/low-stock',lowStockController.lowstock)

router.get('/best-seller',bestSellerController.bestSeller)

router.get('/max-price', searchController.maxPrice)
router.get('/min-price', searchController.minPrice)
router.get('/brands', searchController.brands)
router.get('/get-item-by-id/:id', searchController.getItemById)

module.exports=router;