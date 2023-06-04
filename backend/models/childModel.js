
const mongoose=require('mongoose');

const childSchema=new mongoose.Schema({
    name:{
        type:String,
        default:"Anonymous",
        trim:true

    },
    category:{
        type:Number,
        required:[true,"Please Enter type of Case for this child"],

    },
    keyCase:{
        type:String,
        required:[true,"Please Share the description of the child"]

    },
    DateOfBirth:{
        type:Date,
        required:[true,"Please Enter Approx DateOfBirth "],

    },
    familyDetails:{
        type:String,
        default:"No details of the family known"
    },
    gender:{
        type:String,
        required:true
    },
    images:[
        {
        public_id:{
            type:String,
            default:"Dummy"
            // required:true
        },
        url:{
            type:String,
            default:"dummy"
            // required:true
        }
    }

    ],
    pinCode:{
        type:Number,
        required:true
    },
    CCI:{
        type:String,
        required:true
    }
    

})
module.exports=mongoose.model("Child",childSchema);