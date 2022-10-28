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

app.post("/register", (req, res) => {
    var registerEmail = req.body["email2"];
    var registerPassword = req.body["psw2"];
    var registerAuth = req.body["auth"];

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

        for(var i = 0; i < registerEmail.length; i++)
        {
            console.log("registerEmail: " + registerEmail);
            console.log("registerPassword: " + registerPassword);
            console.log("registerAuth: " + registerAuth);
            console.log("TrueEmail: " + users[i].username);
            console.log("TruePassword: " + users[i].password);
    
            if(registerEmail != users[i].username && registerAuth === 'todo2022')
            {   
                var more = {"username": registerEmail, "password": registerPassword};
                users.push(more);

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