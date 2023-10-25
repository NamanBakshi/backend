const jwt=require("jsonwebtoken")

const logoutController=async (req,res)=>{
    try {
                      //name of cookie
        res.clearCookie("token", {
        domain: "localhost:5173",
        httpOnly: true,
        });
        //res.Cookies.Clear()
        res.clearCookie("token")
        res.status(200).json("Logged out successfully");
      } catch (err) {
        res.status(500).json(err);
      }
}

const getProfileController=(req,res)=>{
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, (err, info) => {
      if (err) {
        res.status(401).json("Not authorized by getprofilecontroller");
      }
      //console.log("info= "+JSON.stringify(info))
      res.json(info);
    
    })
}

module.exports={logoutController,getProfileController}