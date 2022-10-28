const bodyParser = require('body-parser');
const express = require ( "express" );

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true})); 

// a common localhost test port
const port = 3000; 

// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
});

//here is where statis files are stores
app.use(express.static("public"))

app.use(bodyParser.json());


app.post("/login", (req, res) => {
    var loginEmail = req.body["email1"];
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

        for(var i = 0; i < loginEmail.length; i++)
        {
            console.log("loginEmail: " + loginEmail);
            console.log("loginPassword: " + loginPassword);
            console.log("TrueEmail: " + users[i].username);
            console.log("TruePassword: " + users[i].password);
    
            if(loginEmail == users[i].username && loginPassword == users[i].password)
            {
                console.log("SUCCESS");
                res.redirect("/todo.html");
            }
            else
            {
                console.log("FAILURE");
                res.redirect("/");
            }
        }
    }
    catch ( err ) 
    {
        console.log("Error parsing JSON:", err);
    }
    });
});

function getUsers()
{
    var fs = require('fs')
    fs.writeFile('./public/users.json', JSON.stringify(usersLoaded), (err) => {
        if (err) console.log('Error writing file:', err);
    });
}

function addUsers()
{
    usersLoaded = require('./public/users.json');
}

function getTasks()
{
    var fs = require('fs')
    fs.writeFile('./public/task.json', JSON.stringify(tasksLoaded), (err) => {
        if (err) console.log('Error writing file:', err);
    });
}

function addTasks()
{
    tasksLoaded = require('/public/task.json');
}

app.post("/register", (req, res) => {
    addUsers();
    var isItTrue = 0;
    var registerEmail = req.body["email2"];
    var registerPassword = req.body["psw2"];
    var registerAuth = req.body["auth"];

    if(registerAuth == "todo2022")
    {
        for(var i = 0; i < usersLoaded.length; i++)
        {
            if(registerEmail == usersLoaded[i].username)
            {
                isItTrue = 1;
                res.redirect("/");
                break;
            }
        }
        if(isItTrue != 1)
        {
            usersLoaded.push({"username": registerEmail, "password": registerPassword});
            getUsers();
            res.redirect("/todo.html");
        }
        isItTrue = 0;
    }
    else
    {
        res.redirect("/");
    }
});