/*const fs = require( "fs" );

fs.readFile ( __dirname + "/object.json",
            "utf8", 
            ( err, jsonString ) => {
    if ( err ) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        const object = JSON.parse(jsonString);
        console.log("User's name is:", object.firstName); // Adam
        console.log(object); // entire object.json
    } catch ( err ) {
        console.log("Error parsing JSON:", err);
    }
});*/

/*const calculate = require(__dirname + "/calc.js");
const add = calculate.add;

console.log(add(3,5));*/

const express = require ( "express" );

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 

//here is where statis files are stores
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true})); 

// a common localhost test port
const port = 3000; 

// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

//lab exercise work
/*app.post("/", (req, res) => {
    res.send("<h1>message received: "+ req.body["my-text-entry"]+"</h1>");
  });
  
app.get("/about", (req, res) => {
    res.send("<h1> I am a SSE student at U of R! </h1>");
    console.log("A user requested the about page");
});

app.get("/games", (req, res) => {
    res.send("<h1>I am currently playing Midwatch 2</h1>");
    console.log("A user requested the about page");
});*/