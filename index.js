const express = require('express');
const app = express();
const cors = require("cors");
const http = require("http");
app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');


/*
// oauth

const passport = require('passport');
const googlestrategy = require('passport-google-oauth20');


passport.use(new googlestrategy({
    clientID: "919089587970-q6oirjdbi1mlqg3400vplgav8gu3bb7o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback"

}, (accessToken, refreshToken, profile, done) => {
    console.log("accessToken");
    console.log(accessToken)
    console.log("refreshToken");
    console.log(refreshToken)
    console.log("profile");
    console.log(profile)
    console.log(profile.displayName)
  
}))

app.get("/", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

app.get("/auth/google/callback", passport.authenticate("google"))
*/

// routes 
const getroute = require("./routes/getRoutes");
app.use('/api', getroute);


const PORT = 8000;
const DB = "mongodb+srv://spuspam111:Sp123456@cluster0.0taaaup.mongodb.net/getapi?retryWrites=true&w=majority";
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


