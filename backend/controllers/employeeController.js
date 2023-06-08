const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Employee = require('../models/employeeModel');
const sendToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");
const { authorizeRoles } = require('../middleware/auth');
const getResetPasswordToken=require('../models/employeeModel')
const jwt = require('jsonwebtoken')
//register employee
exports.registerEmployee = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, pincode, role } = req.body;
    console.log(req.body)
    const employee = await Employee.create({
        name, email, password, pincode, role,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl"
        },
    });
    sendToken(employee, 201, res);
    res.status(200).json({
                success: true,
                message: employee,
            });
});

//Login Employee
exports.loginEmployee = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler("Please Enter Email and password", 400))
    }
    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
        return next(new errorHandler("Invalid email", 401));
    }
    const isPasswordMatched = await employee.comparePassword(password);
    //const isPasswordMatched=await employee.password===req.body.password;

    if (!isPasswordMatched) {
        return next(new errorHandler("Invalid Password", 401));
    }
    res.status(200).json({
        success: true,
        message: employee,
        token: employee.getJWTToken()
    });
    sendToken(employee, 200, res);
})
//Logout Employee
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findOne({ email: req.body.email });
    if (!employee) {
        return next(new errorHandler("Employee not found", 404));
    }
    const resetToken = employee.getResetPasswordToken();

    await employee.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/ap1/v1/password/${resetToken}`;
    const message = `Your password rest token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore`;

    try {
        await sendEmail({
            email: employee.email,
            subject: "Password recovery email",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${employee.email} successfully`
        })
    } catch (error) {
        employee.resetPasswordToken = undefined;
        employee.resetPasswordExpire = undefined;

        await employee.save({ validateBeforeSave: false });
        return next(new errorHandler(error.message, 500));
    }
})
// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const employee = await Employee.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!employee) {
        return next(new errorHandler("Reset Password token is not valid or has been expired", 401));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler("Password does not match", 401));
    }
    employee.password = req.body.password;
    employee.resetPasswordToken = undefined;
    employee.resetPasswordExpire = undefined;

    await employee.save();
    sendToken(employee, 200, res);


});

exports.getEmployeeDetails = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.body.id);
    res.status(200).json({
        success: true,
        employee,
    })
})

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.employee.id).select("+password");
    const isPasswordMatched = await employee.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new errorHandler("Old Password is Incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new errorHandler("Password does not match", 400));
    }
    employee.password = req.body.newPassword;
    await employee.save();
    sendToken(employee, 200, res);
})

// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
//     const newEmployeeData = {
//         name: req.body.name,
//         email: req.body.email,
//     };
//     const employee = await Employee.findByIdAndUpdate(req.employee.id, newEmployeeData, {
//         new: true,
//         runValidators: true,
//     });
//     res.status(200).json({
//         success: true,
//         employee
//     })


//     sendToken(employee, 200, res);
// });
exports.getAllEmployee = catchAsyncErrors(async (req, res, next) => {
    const employees = await Employee.find();

    res.status(200).json({
        success: true,
        employees
    })
})
exports.getSingleEmployee = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new errorHandler(`Employee does not exist with id :${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        employee,
    })
})
//Update Employee Role
exports.updateEmployeeRole = catchAsyncErrors(async (req, res, next) => {
    const employeeId = req.params.id;
    const { name, email, role, childId } = req.body;
  
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $push: { children: childId },
        $set: { name, email, role },
      },
      { new: true, runValidators: true }
    );
  
    if (!updatedEmployee) {
      // Handle the case where the employee is not found
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
  
    res.status(200).json({
      success: true,
      employee: updatedEmployee,
    });
  
    sendToken(updatedEmployee, 200, res);
  });
  
  
  
  

// //Delete Employee

exports.deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
        return next(new errorHandler(`Employee does not exist with id :${req.params.id}`, 400));
    }
    await Employee.deleteOne({ _id: req.params.id });
    console.log("Employee Deleted");
    res.status(200).json({
        success: true,
        employee
    })

    sendToken(employee, 200, res);
});

exports.getCase = catchAsyncErrors(async (req, res, next) => {
    const {id, pincode} = await req.user;
    
    
})

exports.getEmployeeWithRole = catchAsyncErrors(async (req, res, next) => {
    const role = req.params.role;

    if(role !== 1 && role !== 2 && role != 3){
        res.status(404).json({
            success: false,
            message: "Invalid Role"
        })
    }

    const employees = await Employee.find({ role });

    res.status(200).json({
        success: true,
        employees,
    })
})

exports.parseToken = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if(!payload){
        res.status(404).json({
            success: false,
            message: "Invalid token"
        })
    }

    res.status(200).json({
        success: true,
        payload
    })
})