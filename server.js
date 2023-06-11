const app=require('./app');
require('dotenv').config();
const connectDatabase=require('./config/database');
const cors = require('cors');
app.use(cors())

const BASE_URL = process.env.BASE_URL
const PORT = process.env.PORT 

// const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});
//Config
connectDatabase();
app.listen(PORT , ()=>{
    console.log(`Server is working on ${BASE_URL}`);
})
//Unhandled Promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    })

})
