const mongoose = require('mongoose');

const generateProcessSchema = (actionLeft) => {
  const processSchema = new mongoose.Schema({
    child: { type: mongoose.Schema.ObjectId, ref: "Child", required: true },
    DateofAdmission: {
      type: Date,
      default:Date.now
      // required: true
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
      // required: true
    },
    photoPublication1: [{
      dateRegistered: {
        type: Date
      },
      nameofChannel: {
        type: String
      },
      public_id: {
        type: String,
        default: "Dummy"
        // required: true
      },
      url: {
        type: String,
        default: "dummy"
        // required: true
      }
    }],
    photoPublication2: [{
      dateRegistered: {
        type: Date
      },
      nameofChannel: {
        type: String
      },
      public_id: {
        type: String,
        default: "Dummy"
        // required: true
      },
      url: {
        type: String,
        default: "dummy"
        // required: true
      }
    }],
    tvTelecasting: [{
      channelName: {
        type: String
      },
      dateofPublishing: {
        type: Date
      }
    }],
    policeReport: [{
      dateRegistered: {
        type: Date
      },
      public_id: {
        type: String,
        default: "Dummy"
        // required: true
      },
      url: {
        type: String,
        default: "dummy"
        // required: true
      }
    }],
    familyApproval: [{
      dateRegistered: {
        type: Date
      },
      public_id: {
        type: String,
        default: "Dummy"
        // required: true
      },
      url: {
        type: String,
        default: "dummy"
        // required: true
      }
    }],
    previousOrgReport: {
        dateRegistered: {
            type: Date
          },
          public_id: {
            type: String,
            default: "Dummy"
            // required: true
          },
          url: {
            type: String,
            default: "dummy"
            // required: true
          }
    },
    finalReport: {
        dateRegistered: {
            type: Date
          },
          public_id: {
            type: String,
            default: "Dummy"
            // required: true
          },
          url: {
            type: String,
            default: "dummy"
            // required: true
          }
    },
    FreeForAdoptionDate: {
        dateRegistered: {
            type: Date
          },
          public_id: {
            type: String,
            default: "Dummy"
            // required: true
          },
          url: {
            type: String,
            default: "dummy"
            // required: true
          }
    },
    MER: {
        dateRegistered: {
            type: Date
          },
          public_id: {
            type: String,
            default: "Dummy"
            // required: true
          },
          url: {
            type: String,
            default: "dummy"
            // required: true
          }
    },
    CSR: {
        dateRegistered: {
            type: Date
          },
          public_id: {
            type: String,
            default: "Dummy"
            // required: true
          },
          url: {
            type: String,
            default: "dummy"
            // required: true
          }
    },
    CaringsUpload: {
        dateRegistered: {
            type: Date
          },
          public_id: {
            type: String,
            default: "Dummy"
            // required: true
          },
          url: {
            type: String,
            default: "dummy"
            // required: true
          }
    },
    ScreenShot: [{
      dateRegistered: {
          type: Date,
          default:Date.now()
        },
        public_id: {
          type: String,
          // required: true
        },
        url: {
          type: String,
          // required: true
        }
  }],
    lastVisitByFamily: {
      type: Date
    },
    ActionDone: {
      type: [String], // Array of strings
      default: [] // Empty array by default
    },
    actionLeft: {
      type: [String],
      default: actionLeft
    }
    // Add other attributes based on the actionLeft
  });

  actionLeft.forEach(attribute => {
    processSchema.add({
      [attribute]: {
        type: String,
        required: true
      }
    });
  });

  return processSchema;
};

const Process = mongoose.model('Process', generateProcessSchema([]));
module.exports = Process;
