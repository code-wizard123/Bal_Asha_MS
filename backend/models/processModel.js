
const mongoose=require('mongoose');

const processSchema=new mongoose.Schema({
    child: { type: mongoose.Schema.ObjectId, ref: "Child",required:true },
    DateofAdmission:{
        type:Date,
        required:true
    },
    enrollmentDate:{
        type:Date,
        default:Date.now,
        required:true

    },
    photoPublication1:[{
        dateRegistered:{
            type:Date
        },
        nameofChannel:{
            type:String
        },
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
    }],
    photoPublication2:[{
        dateRegistered:{
            type:Date
        },
        nameofChannel:{
            type:String
        },
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
    }],
    tvTelecasting:[{
        channelName:{
            type:String
        },
        dateofPublishing:{
            type:Date
        }
    }],
    policeReport:[{
        dateRegistered:{
            type:Date
        },
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
    }],
    previousOrgReport:{
        type:Date
    },
    finalReport:{
        type:Date
    },
    FreeForAdoptionDate:{
        type:Date
    },
    MER:{
        type:Date
    },
    CSR:{
        type:Date
    },
    CaringsUpload:{
        type:Date
    },
    lastVisitByFamily:{
        type:Date
    },
    ActionDone: {
        type: [String], // Array of strings
        default: [] // Empty array by default
      }
    

})
module.exports=mongoose.model("Process",processSchema);