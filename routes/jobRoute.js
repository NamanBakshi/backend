const express=require("express")
const router=express.Router()
const {addJobController,
    getJobsController,
    getOneJobController,
    updateJobController,
    deleteJobController}=require("../controllers/jobController")

router.post("/addjobs", addJobController);
router.get("/getjobs", getJobsController);
router.patch("/updatejob/:id", updateJobController);
router.delete("/deletejob/:id", deleteJobController);
router.get("/job/:id", getOneJobController);
module.exports=router