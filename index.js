const express= require('express');
const app= express();
const cors = require("cors");
const http = require("http");
app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');



// routes 
const getroute= require("./routes/getRoutes");
app.use('/api', getroute);


  const PORT = 8000;
 const DB= "mongodb+srv://spuspam111:Sp123456@cluster0.0taaaup.mongodb.net/getapi?retryWrites=true&w=majority";
  mongoose.connect(DB)
      .then(() => {
          console.log("Connected to MongoDB");
          const server = http.createServer(app);
          server.listen(PORT, () => {
              console.log(`Server is running on :${PORT}`);
          });
      })
      .catch(error => {
          console.error("Error connecting to MongoDB:", error);
      });


      