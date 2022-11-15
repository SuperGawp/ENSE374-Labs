const bodyParser = require('body-parser');
const express = require ( "express" );

const mongoose = require( "mongoose" );
// connect to mongoose on port 27017
mongoose.connect( "mongodb://localhost:27017/todo", 
                { useNewUrlParser: true, 
                  useUnifiedTopology: true});

// create a mongoose schema for Users
const userSchema = new mongoose.Schema ({
    username:   String,
    password:   String
});

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

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express();

// a common localhost test port
const port = 3000; 

// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});

app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true})); 

//here is where statis files are stores
app.use(express.static(__dirname + '/public'));

var loginUser = [];
var currentUser;
var taskLoaded = [];

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/todo", function (req, res) {
    res.render("todo", {username: currentUser, tasks: taskLoaded});
});

//--------------------------------------------------------------------------------

function addUsers()
{
    var fs = require('fs')
    fs.writeFile('./public/users.json', JSON.stringify(usersLoaded), (err) => {
        if (err) console.log('Error writing file:', err);
    });
}

function getUsers()
{
    usersLoaded = require('./public/users.json');
}

function addTasks()
{
    var fs = require('fs')
    fs.writeFile('./public/tasks.json', JSON.stringify(taskLoaded), (err) => {
        if (err) console.log('Error writing file:', err);
    });
}

function getTasks()
{
    taskLoaded = require('./public/tasks.json');
}

//--------------------------------------------------------------------------------

app.get("/logout",(req,res)=>{
    currentUser = null;
    res.redirect("/");
});

app.post("/login", async(req, res) => {
    getTasks();
    getUsers();
    loginUser = req.body["user1"];
    var loginPassword = req.body["psw1"];

    const fs = require( "fs" );
    fs.readFile ( __dirname + "/public/users.json",
            "utf8", 
            ( err, jsonString ) => {
    if ( err ) 
    {
        console.log("Error reading file from disk:", err);
        return;
    }
    try 
    {
        const users = JSON.parse(jsonString);

        console.log(users); // entire users.json

        for(var i = 0; i < usersLoaded.length; i++)
        {
            console.log("loginUser: " + loginUser);
            console.log("loginPassword: " + loginPassword);
            console.log("TrueEmail: " + users[i].username);
            console.log("TruePassword: " + users[i].password);
            if(loginUser == users[i].username && loginPassword == users[i].password)
            {   
                currentUser = users[i].username;
                console.log("SUCCESS");

                res.redirect("/todo");
            }
        }
        console.log("FAILURE");
        res.redirect("/");
    }
    catch ( err ) 
    {
        console.log("Error parsing JSON:", err);
    }
    });
});

app.post("/register", (req, res) => {
    getTasks();
    getUsers();
    var isItTrue = 0;
    var registerUser = req.body["user2"];
    var registerPassword = req.body["psw2"];
    var registerAuth = req.body["auth"];

    if(registerAuth == "todo2022")
    {
        for(var i = 0; i < usersLoaded.length; i++)
        {
            if(registerUser == usersLoaded[i].username)
            {
                isItTrue = 1;
                res.redirect("/");
                break;
            }
        }
        if(isItTrue != 1)
        {
            usersLoaded.push({"username": registerUser, "password": registerPassword});
            currentUser = registerUser;
            addUsers();

            const usersDB = new Users({
                username: registerUser,
                password: registerPassword
            });

            usersDB.save();

            res.redirect("/todo");
        }
        isItTrue = 0;
    }
    else
    {
        res.redirect("/");
    }
});

app.post("/addtask",(req,res)=>{
    getTasks();
    var taskLength = taskLoaded.length;
    var addTask = req.body["listText"];

    taskLength++;
    taskLoaded.push({"id": taskLength, "text": addTask, "state": "unclaimed", "creator": currentUser, "isTaskClaimed":false,"claimingUser":null,"isTaskDone":false,"isTaskCleared":false});
    currentUser = req.body.username;
    console.log(currentUser);
    addTasks();

    res.redirect("/todo");
});

app.post("/claim",(req,res)=>{
    getTasks();
    currentUser = req.body["username"];
    var taskID = req.body["taskID"];
    var task = taskLoaded.find(task => task.id == taskID);
    task.claimingUser = currentUser;
    task.isTaskClaimed = false; 
    task.state = "unfinished";
    addTasks();
    res.redirect("/todo");
});

app.post("/abandon",(req,res)=>{
    getTasks();
    currentUser = req.body["username"];
    var taskID = req.body["taskID"];
    var task = taskLoaded.find(task => task.id == taskID);
    task.claimingUser = null;
    task.isTaskClaimed = false; 
    task.state = "unclaimed";
    addTasks();
    res.redirect("/todo");
});

app.post("/finish",(req,res)=>{
    getTasks();
    currentUser = req.body["username"];
    var taskID = req.body["taskID"];
    var task = taskLoaded.find(task => task.id == taskID);
    task.isTaskDone = true;
    task.state = "finished";
    addTasks();
    res.redirect("/todo");
});

app.post("/unfinish",(req,res)=>{
    getTasks();
    currentUser = req.body["username"];
    var taskID = req.body["taskID"];
    var task = taskLoaded.find(task => task.id == taskID);
    task.isTaskDone = false;
    task.state = "unfinished";
    addTasks();
    res.redirect("/todo");
});

app.post("/purge",(req,res)=>{
    getTasks();
    currentUser = req.body["username"];
    for(var i = 0; i < taskLoaded.length; i++)
    {
        if(taskLoaded[i].isTaskDone == true)
        {
            taskLoaded[i].isTaskCleared = true
        }
    }
    addTasks();
    res.redirect("/todo");
});

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