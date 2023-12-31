const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require( "cookie-parser");

const connectDB = require( "./database/connection.jsx");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const jobRoute = require("./routes/jobRoute");

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/careerhelper";

connectDB(MONGO_URL)

app.use(
    cors({
      origin: ["http://localhost:5173","https://backend-82wc.onrender.com","https://dazzling-dasik-eb321a.netlify.app",
      "https://roaring-biscotti-b0ca08.netlify.app/",
      "https://roaring-biscotti-b0ca08.netlify.app/jobs"

    ]
    
    , // <-- location of the react app were connecting to
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true,
    })
  );
  
  app.use(express.json());
  app.use(cookieParser());
  app.use(authRoute,jobRoute,userRoute);
  app.set("trust proxy", 1);


app.listen(PORT, () => {
  //console.log(`CareerHelper Server is Running on ${PORT} `);
});