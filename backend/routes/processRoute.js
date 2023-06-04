const express=require('express');
// const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
const { newProcess,myProcess } = require('../controllers/processController');


const router=express.Router();

router.route("/process/new").post(/*isAuthenticatedUser,*/newProcess);
// router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/process/me").get(/*isAuthenticatedUser,*/myProcess);

// router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
// router.route("/admin/orders/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);






module.exports=router;