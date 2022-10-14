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

let s = "hello world"

console.log(s)