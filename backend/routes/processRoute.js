const express=require('express');
// const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
const { newProcess,myProcess, getAllProcess, updateProcess, deleteProcess, getSingleProcess } = require('../controllers/processController');
const {emailChildProfile}=require('../middleware/childDetails')

const router=express.Router();

router.route("/process/new").post(/*isAuthenticatedUser,*/newProcess);
// router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/process/me").get(/*isAuthenticatedUser,*/myProcess);
router.route("/process/:childId").get(/*isAuthenticatedUser,*/getSingleProcess);
router.route("/admin/process").get(/*isAuthenticatedUser,authorizeRoles("admin"),*/getAllProcess);
router.route("/admin/process/:id").put(/*isAuthenticatedUser,authorizeRoles("admin"),*/updateProcess).delete(/*isAuthenticatedUser,authorizeRoles("admin"),*/deleteProcess);
router.route("/sendEmail").post(emailChildProfile);





module.exports=router;