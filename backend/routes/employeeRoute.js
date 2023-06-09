const express = require('express');
const { registerEmployee, loginEmployee,
    logOut,getAllEmployee,updateEmployeeRole,getSingleEmployee, deleteEmployee, forgotPassword,resetPassword, updatePassword, getEmployeeWithRole, parseToken,getEmployeeDetails, getOperationWithPincode,updateCasesClosed /* updateProfile */} = require("../controllers/employeeController");
const { isAuthenticatedEmployee, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/register").post(registerEmployee);
router.route("/login").post(loginEmployee);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logOut);
router.route("/password/update").put(/*isAuthenticatedEmployee,*/ updatePassword);
router.route("/operation/:pincode").get(getOperationWithPincode);
router.route("/employees/:employeeId/children/:childId/updateCasesClosed").put(updateCasesClosed);
router.route("/me").post(getEmployeeDetails);
router.route("/admin/employees").get(/*isAuthenticatedEmployee, authorizeRoles("admin"),*/ getAllEmployee);
router.route("/admin/employee/:id").get(/*isAuthenticatedEmployee, authorizeRoles("admin"),*/ getSingleEmployee).put(/*isAuthenticatedEmployee, authorizeRoles("admin"),*/updateEmployeeRole).delete(/*isAuthenticatedEmployee, authorizeRoles("admin"),*/ deleteEmployee);
router.route("/parsetoken").post(parseToken)
router.route("/getgroundworkers/:role").get(isAuthenticatedEmployee, authorizeRoles(1), getEmployeeWithRole)


module.exports = router;
