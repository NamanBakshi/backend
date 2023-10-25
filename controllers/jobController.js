const jobModel = require("../models/jobModel.js");
const jwt=require("jsonwebtoken")


const addJobController=async(req,res,next)=>{
    try{
        const {company,position,location,workfrom}=req.body

        if(!company || !position || !location || !workfrom){
            return res.status(402).send({
                success:false,
                message:"please enter all fields"
            })
        }
        //console.log("req.cookies= "+(req))
        const {token}=req.cookies
        console.log("token in addjobcontroller= "+token+"-- req = "+req)

        // if (!token) {
        //     return res.status(403).send({
        //       success: false,
        //       message: "Please login first",
        //     });
        //   }
          jwt.verify(token, process.env.SECRET,{} ,async (err, info) => {
            //inffo=info
            console.log("info in jwt.verify="+JSON.stringify(info))
            if (err) {
              res.status(401).json("Not authorized by addjobcontroller = "+err+" --req--"+req+"--res-- "+res);
            }
        //console.log("inffo= "+inffo)
        // const jobdata={
        //     company,position,location,workfrom,
        //     author:info.id
        // }
        // const job=new jobModel(jobdata) 
        // const jobsaved=await job.save() 
        await jobModel.create({
            company,
            position,
            location,
            workfrom,
            author: info.id
          });
        // if(!jobsaved ){
        //     return  res.status(500).send({success:false})
        // }
        res.status(203).send({success:true,message:'job post added'});
        //next()
    })
    }catch(err){
       res.status(400).send({
        message:"error in addjobcontroller",
        success:false,
        err
       })
    }
}

const getJobsController=async (req,res)=>{
    try{
        const jobs=await jobModel.find().sort({ createdAt: -1 })
        if(!jobs){
            return res.status(500).send({
                message:"couldnt fetch jobs",
                success:false
            })
        }
        res.status(200).send({
            jobs ,success : true,message:"jobs retrieved successfully"
            })
    }catch(err){
        res.send(500).send({
            success:false,
            message:"error in getjobscontroller",
            err
        })
    }
}

const getOneJobController=async (req,res)=>{
    try{
        const {id}=req.params //this req.params is express.js method not react useParams()
        const job = await jobModel.findOne({ _id: id });
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    })
    }catch(err){
        return res.send({success:false,message:"error in getonejobcontroller",err})
    }
}

const updateJobController=async(req,res)=>{
    try{
        const {id}=req.params
        const {company,position,location,workfrom}=req.body
        if(!company || !position || !location || !workfrom){
            return res.status(402).send({
                success:false,
                message:"please enter all fields"
            })
        }
        const updatedjob={
            company,position,location,workfrom
        }
        const job= await jobModel.findByIdAndUpdate({_id:id},updatedjob)
        if(!job){
            return  res.status(404).send("no such job")
            }
        return res.status(203).send({
                message:"job post updated successfully",
                success:true,
                job:updatedjob
            })
            
    }catch(err){
        return  res.send({success:false,message:"error in updatejobcontroller"})
    }
}

const deleteJobController=async(req,res)=>{
    try{
        const {id}=req.params
        const deletedpost=await jobModel.findByIdAndDelete({_id:id})
        if(!deletedpost) return res.status(404).send({
            success:false,
            message:"error in deleting post"
        })
        res.status(203).send({
            message:"post deleted successfully",
            success:true
        })
    }catch(err){
        return  res.send({success:false,message:"error in deletejobcontroller"})
    }
}

module.exports={addJobController,getJobsController,getOneJobController,updateJobController,deleteJobController}