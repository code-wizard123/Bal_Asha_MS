const express= require('express');
const app=express();
const errorMiddleware=require('./middleware/error');
const cookieParser=require('cookie-parser');
app.use(express.json())
app.use(cookieParser());
// const product=require('./routes/productRoute');
const employee=require('./routes/employeeRoute');
// const order=require('./routes/orderRoutes');
// app.use("/api/v1",product);
app.use("/api/v1",employee);
// app.use("/api/v1",order);
app.use(errorMiddleware);

//Middleware for error
module.exports=app
