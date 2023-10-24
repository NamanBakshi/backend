const mongoose=require("mongoose")

const connectDB=async(MONGO_URL)=>{
    try{
        await mongoose.connect(MONGO_URL)
        //console.log("database connected")
    }catch(e){
        console.log("database connection failded",e)
        //return e
    }
}

module.exports=connectDB