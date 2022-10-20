const express = require ( "express" );
var bodyParser = require('body-parser')

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express();

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
app.use(express.urlencoded({ extended: true})); 
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/login", (req, res) => {
    var InputEmail = req.body.email;
    var InputPassword = req.body.password;

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

        console.log("InputEmail: " + InputEmail);
        console.log("InputPassword: " + InputPassword);
        console.log("TrueEmail: " + users.email);
        console.log("TruePassword: " + users.password);

        if(InputEmail == users.email && InputPassword == users.password)
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
    catch ( err ) 
    {
        console.log("Error parsing JSON:", err);
    }
    });
});