const express=require('express');
const { getAllChilds,createChild , updateChild, deleteChild,/*, getOneChild, getChildDetails, createChildReview, deleteReview, getChildReviews*/ 
getOneChild}=require("../controllers/childController");
// const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
// const { getAllChilds } = require('../controllers/childController');

const router=express.Router();

router.route('/childs').get(getAllChilds);
router.route('/admin/child/new').post/*(isAuthenticatedUser,authorizeRoles("admin"),*/(createChild);
router.route('/admin/child/:id').put(/*isAuthenticatedUser,authorizeRoles("admin"),*/updateChild).delete(/*isAuthenticatedUser,authorizeRoles("admin"),*/deleteChild);
router.route('/admin/child/:id').get(getOneChild);
// router.route('/review').put(isAuthenticatedUser,createChildReview);
// router.route('/reviews').get(getChildReviews).delete(isAuthenticatedUser,deleteReview);
module.exports=router;