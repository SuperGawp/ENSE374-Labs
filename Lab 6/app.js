const fs = require( "fs" );

fs.readFile ( __dirname + "/object.json",
            "utf8", 
            ( err, jsonString ) => {
    if ( err ) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        const object = JSON.parse(jsonString);
        console.log("User's name is:", object.name); // Adam
    } catch ( err ) {
        console.log("Error parsing JSON:", err);
    }
});

const calculate = require(__dirname + "/calc.js");
const add = calculate.add;

console.log(add(3,5));

const express = require ( "express" );

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
    res.send("<h1> Hello Node World! </h1>");
    console.log("A user requested the root route");
});


let s = "hello world"

console.log(s)