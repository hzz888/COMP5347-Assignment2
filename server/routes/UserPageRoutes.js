const express = require('express');
const router = express.Router();
const fetchUserDataController = require('../controllers/UserController/FetchUserDataController')
const updateProfileController = require('../controllers/UserController/UpdateProfileController')
const PwUpdateNotificationController = require('../controllers/UserController/PwUpdateNotificationController')
const FetchUserListing = require('../controllers/UserController/FetchListingController')
const EditListingController = require('../controllers/UserController/EditListingController')
const AddListingController = require('../controllers/UserController/AddListingController')
const ToggleCommentController = require('../controllers/UserController/EditCommentController')

const FetchUserDataController2 = require('../controllers/UserController/FetchUserData2Controller')
//Fetch user info


router.get('/fetch-user-data2', FetchUserDataController2.fetchUserData2)
//{Email}

//Fetch UserPage info
router.get('/fetch-user-data/:userid', fetchUserDataController.fetchUserData)
//{Id}

//Update UserPage info
router.post('/updateProfile', updateProfileController.updateProfile)
//{Email,FirstName, LastName,ID}

//Send notification to UserPage when update password
router.post('/pwUpdateNotification', PwUpdateNotificationController.PwUpdateNotification)
//{Email}

//Fetch UserPage's product list
router.get('/fetchUserListings', FetchUserListing.fetchListings)
//{seller_id}

//Edit UserPage's product list
router.post('/editlisting', EditListingController.editListing)
//{listing_id,method}, method: disable, enable,delete

//Add a new product to UserPage's product list
router.post('/addlisting', AddListingController.editListing)
//{Title,Brand,Image,Stock,Seller,Price,Disabled} , price and stock should be double and integer 

//Toggle whether a comment is visible
router.post('/toggleComment', ToggleCommentController.editComment)
// {Reviewer,Listing_id,Is_shown} , Is_shown should be true or false

module.exports = router;