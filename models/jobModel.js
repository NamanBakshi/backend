const mongoose=require("mongoose")

const jobSchema=new mongoose.Schema({
        company: {
          type: String,
          required: true,
        },
        position: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          default: "Bengaluru",
          required: true,
        },
        workfrom: {
          type: String,
          default: "Remote",
        },
        jobdescription: {
          type : String,
          default : "Job Description",
          required : false
        },
        responsibilities:{
          type : String,
          default : "Responsibilities",
          required : false
        },
        active: {
          type : Boolean,
          default : true
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
      { timestamps: true }
    );

module.exports=mongoose.model("jobs",jobSchema)
