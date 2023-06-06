const express=require('express');
const { getAllChilds,createChild , updateChild, deleteChild,/*, getOneChild, getChildDetails, createChildReview, deleteReview, getChildReviews*/ 
getChildDetails,getOneChild, getAllChildsPinCode}=require("../controllers/childController");
const { isAuthenticatedEmployee,authorizeRoles } = require('../middleware/auth');
// const { getAllChilds } = require('../controllers/childController');

const router=express.Router();

router.route('/childs').get(getAllChilds);//Add ? to get pincode specific details
router.route('/admin/child/new').post/*(isAuthenticatedUser,authorizeRoles("admin"),*/(createChild);

//Operation Manager
// router.route('/opManager/').(isAuthenticatedUser,authorizeRoles(2), );

// Ground Worker
router.route('/groundWorker/new').post(/*isAuthenticatedEmployee,authorizeRoles(3),*/ createChild);
router.route('/groundWorker/childs').get(/*isAuthenticatedEmployee,authorizeRoles(3),*/ getAllChilds);
router.route('/groundWorker/childs/:id').get(/*isAuthenticatedEmployee,authorizeRoles(3),*/ getOneChild);
router.route('/groundWorker/getchild/:id').post(/*isAuthenticatedEmployee,authorizeRoles(3),*/ getChildDetails);

//Case Manager



router.route('/admin/child/new').post/*(isAuthenticatedUser,authorizeRoles("admin"),*/(createChild);
router.route('/admin/child/:id').put(/*isAuthenticatedUser,authorizeRoles("admin"),*/updateChild).delete(/*isAuthenticatedUser,authorizeRoles("admin"),*/deleteChild);

// router.route('/admin/child/:id').get(getChildDetails);
// router.route('/review').put(isAuthenticatedUser,createChildReview);
// router.route('/reviews').get(getChildReviews).delete(isAuthenticatedUser,deleteReview);
module.exports=router;