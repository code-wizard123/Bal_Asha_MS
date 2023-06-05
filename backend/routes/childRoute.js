const express=require('express');
const { getAllChilds,createChild , updateChild, deleteChild,/*, getOneChild, getChildDetails, createChildReview, deleteReview, getChildReviews*/ 
getChildDetails}=require("../controllers/childController");
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
// const { getAllChilds } = require('../controllers/childController');

const router=express.Router();

router.route('/childs').get(getAllChilds);
router.route('/admin/child/new').post/*(isAuthenticatedUser,authorizeRoles("admin"),*/(createChild);

//Operation Manager
// router.route('/opManager/').(isAuthenticatedUser,authorizeRoles(2), );

// Ground Worker
router.route('/groundWorker/new').post(isAuthenticatedUser,authorizeRoles(3), createChild);
router.route('/groundWorker/childs').get(isAuthenticatedUser,authorizeRoles(3), getAllChilds);
router.route('/groundWorker/getchild/:id').post(isAuthenticatedUser,authorizeRoles(3), getChildDetails);

//Case Manager



router.route('/admin/child/new').post/*(isAuthenticatedUser,authorizeRoles("admin"),*/(createChild);
router.route('/admin/child/:id').put(/*isAuthenticatedUser,authorizeRoles("admin"),*/updateChild).delete(/*isAuthenticatedUser,authorizeRoles("admin"),*/deleteChild);

// router.route('/admin/child/:id').get(getChildDetails);
// router.route('/review').put(isAuthenticatedUser,createChildReview);
// router.route('/reviews').get(getChildReviews).delete(isAuthenticatedUser,deleteReview);
module.exports=router;