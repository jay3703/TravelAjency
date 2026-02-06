var express = require("express");
var bodyParser = require("body-parser");
var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");
var path = require("path");
const session = require('express-session');

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
const fileUpload = require("express-fileupload");

app.use(session({
    secret: 'your-secret-key',  // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
}));

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// USER ROUTES
app.use("/user", userRouter);

// ADMIN ROUTES
app.use("/admin", adminRouter);

// DEFAULT REDIRECT (home page)
app.get("/", (req,res)=>{
    res.redirect("/user");
});

var PORT = 3000;
app.listen(PORT, ()=>{
    console.log("Server running on " + PORT);
});
