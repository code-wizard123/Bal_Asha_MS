const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Employee = require('../models/employeeModel');
const BackupChild = require('../models/backupChildModel');
const sendToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");
const { authorizeRoles } = require('../middleware/auth');
const getResetPasswordToken = require('../models/employeeModel')
const jwt = require('jsonwebtoken')
//register employee
exports.registerEmployee = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, pincode, role, avatar } = req.body;
    const employee = await Employee.create({
        name, email, password, pincode, role, avatar
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


exports.getOperationWithPincode = catchAsyncErrors(async (req, res, next) => {
    const { pincode } = req.params;

    const employees = await Employee.find({ pincode: pincode, role: 2 })

    res.status(200).json({
        success: true,
        employees
    })
})
// //Delete Employee

exports.deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id)

    if (!employee) {
        return next(new errorHandler(`Employee does not exist with id :${req.params.id}`, 400));
    }
    await Employee.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        employee
    })

    sendToken(employee, 200, res);
});

exports.getCase = catchAsyncErrors(async (req, res, next) => {
    const { id, pincode } = await req.user;


})

exports.getEmployeeWithRole = catchAsyncErrors(async (req, res, next) => {
    const role = req.params.role;

    const employees = await Employee.find({ role });

    res.status(200).json({
        success: true,
        employees,
    })
})
exports.updateCasesClosed = async (req, res, next) => {
    const { employeeId } = req.params;

    try {
        // Find the employee by ID
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: `Employee not found with ID: ${employeeId}`,
            });
        }

        // Get the current month as a string (e.g., "June")
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });

        // Find the corresponding casesClosed object for the current month
        const casesClosedObject = employee.casesClosed.find((entry) => {
            return entry.month === currentMonth;
        });

        if (casesClosedObject) {
            // Increment the count if the casesClosed object exists for the current month
            casesClosedObject.count += 1;
        } else {
            // Create a new casesClosed object for the current month and set the count to 1
            employee.casesClosed.push({
                month: currentMonth,
                count: 1,
            });
        }

        // Save the updated employee
        await employee.save();

        res.status(200).json({
            success: true,
            message: 'Cases closed count updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

exports.getChildrenUnderOpManager = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    Employee.findById(id)
        .populate('children') // Populating the 'department' field reference
        .exec()
        .then(populatedEmployee => {
            res.status(200).json({
                success: true,
                message: populatedEmployee
            })
        })
})

exports.getChildrenUnderGroundWorker = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    Employee.findById(id)
        .populate('children') // Populating the 'department' field reference
        .exec()
        .then(populatedEmployee => {
            res.status(200).json({
                success: true,
                message: populatedEmployee
            })
        })
})

exports.getGroundWorkerByPincode = catchAsyncErrors(async (req, res, next) => {
    const pincode = req.params.pincode
    const employee = await Employee.find({pincode: parseInt(pincode), role: 3})

    res.status(200).json({
        success: true,
        employee
    })
})
exports.parseToken = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if (!payload) {
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

exports.getEmployeeWithMaxCasesClosed = async (req, res, next) => {
    try {
      // Get the current month as a string (e.g., "June")
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
      // Find the employee with maximum cases closed in the current month
      const employee = await Employee.findOne()
        .sort({ 'casesClosed.count': -1 })
        .select('name email casesClosed')
        .populate('children', 'name')
        .exec();
  
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'No employee found',
        });
      }
  
      // Find the casesClosed object for the current month
      const casesClosedObject = employee.casesClosed.find((entry) => {
        return entry.month === currentMonth;
      });
  
      res.status(200).json({
        success: true,
        employee,
        casesClosed: casesClosedObject,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };