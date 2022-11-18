const express  = require( "express" );
const mongoose = require( "mongoose" );

// 1. Require dependencies /////////////////////////////////////////
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
require("dotenv").config();
////////////////////////////////////////////////////////////////////


// this is a canonical alias to make your life easier, like jQuery to $.
const app = express();

// a common localhost test port
const port = 3000; 

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use (passport.initialize());
app.use (passport.session());

app.set("view engine", "ejs");

// connect to mongoose on port 27017
mongoose.connect( "mongodb://localhost:27017/todo", 
                { useNewUrlParser: true, 
                  useUnifiedTopology: true});

// create a mongoose schema for Users
const userSchema = new mongoose.Schema ({
    username:   String,
    password:   String
});

// plugins extend Schema functionality
userSchema.plugin(passportLocalMongoose);

const Users = mongoose.model ("Users", userSchema);

// create a mongoose schema for Tasks
const tasksSchema = new mongoose.Schema ({
    text:   String,
    state:   String,
    creator:    String,
    isTaskClaimed: Boolean, 
    claimingUser: String, 
    isTaskDone: Boolean, 
    isTaskCleared: Boolean
});

const Tasks = mongoose.model ("Tasks", tasksSchema);

passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true})); 

//here is where statis files are stores
app.use(express.static(__dirname + '/public'));

var loginUser = [];
var currentUser;
var taskLoaded = [];

app.get("/", function (req, res) {
    res.render("login");
});

/*app.get("/todo", function (req, res) {
    res.render("todo", {username: currentUser, tasks: taskLoaded});
});*/

//--------------------------------------------------------------------------------

function loadPage(req,res)
{
    Tasks.find((err, tasks) => {
        if (err) 
        {
            console.log(err);
        } 
        else 
        {
            res.render("todo", 
            {
                username: currentUser,
                tasks: tasks,
            });
        }
    });
    return;
}

//--------------------------------------------------------------------------------

app.get("/logout",(req,res)=>{
    currentUser = null;
    res.redirect("/");
});

app.post( "/login", ( req, res ) => {
    currentUser = req.body.username;
    console.log(req.body.password);
    console.log( "User " + req.body.username + " is attempting to log in" );
    const user = new Users ({
        username: req.body.username,
        password: req.body.password
    });
    req.login ( user, ( err ) => {
        if ( err ) {
            console.log( err );
            res.redirect( "/" );
        } else {
            passport.authenticate( "local" )( req, res, () => {
                loadPage(req,res);
            });
        }
    });
});

app.post( "/register", (req, res) => {
    var registerAuth = req.body["auth"];

    console.log( "User " + req.body.username + " is attempting to register" );
    if(registerAuth == "todo2022")
    {
        currentUser = req.body.username;
        Users.register({ username : req.body.username }, 
            req.body.password, 
            ( err, user ) => {
        if ( err ) {
        console.log( err );
            res.redirect( "/" );
        } else {
            passport.authenticate( "local" , {
                successRedirect: loadPage(req,res), 
                failureRedirect: "/",
            });
        }
        });
    }
    else
    {   
        res.redirect("/");
    }
});

app.post("/addtask", (req,res)=>{
    currentUser = req.body.username;
    const tempTask = new Tasks({
        text: req.body.listText,
        state:"unclaimed",
        creator: req.body.username,
        isTaskClaimed: false,
        claimingUser: "",
        isTaskDone: false,
        isTaskCleared: false,
    })
    console.log(tempTask);
    tempTask.save().then(() => {
        console.log("Task added successfully");
        loadPage(req, res);
    });
    return;
});

app.post("/claim", async (req,res)=>{
    var hiddenID = req.body.taskID;
    currentUser = req.body.username;
    await Tasks.findOneAndUpdate(
        {_id: hiddenID},
        {state:"unfinished",
        claimingUser: currentUser,
        isTaskClaimed:true}
    );
    loadPage(req, res);
    return;
});

app.post("/abandon", async (req,res)=>{
    var hiddenID = req.body.taskID;
    console.log(hiddenID);
    currentUser = req.body.username;
    await Tasks.findOneAndUpdate(
        {_id: hiddenID},
        {state:"unclaimed",
        claimingUser:"",
        isTaskClaimed:false}
    );
    loadPage(req, res);
    return;
});

app.post("/finish", async (req,res)=>{
    var hiddenID = req.body.taskID;
    console.log(hiddenID);
    currentUser = req.body.username;
    await Tasks.findOneAndUpdate(
        {_id: hiddenID},
        {state:"finished",
        isTaskDone:true}
    );
    loadPage(req, res);
    return;
});

app.post("/unfinish", async (req,res)=>{
    var hiddenID = req.body.taskID;
    console.log(hiddenID);
    currentUser = req.body.username;
    await Tasks.findOneAndUpdate(
        {_id: hiddenID},
        {isTaskDone:false,
        state:"unfinished"}
    );
    loadPage(req, res);
    return;
});

app.post("/purge", (req, res) => {
    currentUser = req.body.username;
    Tasks.updateMany({isTaskDone: true},{isTaskCleared: true}, null, (error, res) => {
        if(error) {
            console.log("error");
        }
    });
    loadPage(req, res);
    return;
;});

//-------------------------------------------------------------------

/*const task1 = new Tasks({
    text: "Cleaning room",
    state: "unclaimed",
    creator: "willow",
    isTaskClaimed: false,
    claimingUser: "",
    isTaskDone: false,
    isTaskCleared: false,
});
task1.save();

const task2 = new Tasks({
    text: "Being bad at overwatch",
    state: "unfinished",
    creator: "willow",
    isTaskClaimed: true,
    claimingUser: "willow",
    isTaskDone: false,
    isTaskCleared: false,
});
task2.save();

const task3 = new Tasks({
    text: "Loving the pets",
    state: "unfinished",
    creator: "willow",
    isTaskClaimed: true,
    claimingUser: "aryan",
    isTaskDone: false,
    isTaskCleared: false,
});
task3.save();

const task4 = new Tasks({
    text: "walking the dogs and cat",
    state: "unfinished",
    creator: "willow",
    isTaskClaimed: true,
    claimingUser: "willow",
    isTaskDone: false,
    isTaskCleared: false,
});
task4.save();

const task5 = new Tasks({
    text: "Going Dangerfield shopping",
    state: "finished",
    creator: "willow",
    isTaskClaimed: true,
    claimingUser: "aryan",
    isTaskDone: true,
    isTaskCleared: false,
});
task5.save();*/

/*const user1 = new Users({
    username:   "willow",
    password:   "willow2001",
});
user1.save();
const user2 = new Users({
    username:   "aryan",
    password:   "aryan2002",
});
user2.save();*/