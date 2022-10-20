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

const fs = require( "fs" );

fs.readFile ( __dirname + "/public/users.json",
            "utf8", 
            ( err, jsonString ) => {
    if ( err ) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        const login = JSON.parse(jsonString);
        console.log("Username is:", login.username); //
        console.log(login); // entire users.json
    } catch ( err ) {
        console.log("Error parsing JSON:", err);
    }
});

app.post('/', function (req, res) {

    User.findOne({
        username: req.body.log_username,
        password: req.body.log_password
    }, function (err, docs) {
        if (docs.length !== 0) {
            console.log("user exists");
            res.redirect('/todo.html'); // main page url
        }
        else {
            console.log("no exist");
            res.redirect('/index.html');
        }
    });

});

const users = [
    // This user is added to the array to avoid creating a new user on each restart
    {
        email: 'acl409@email.com',
        // This is the SHA256 hash for value of `password`
        password: 'acl409'
    }
];

app.post('/todo', (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPassword) {

        // Check if user with the same email is also registered
        if (users.find(user => user.email === email)) {

            res.render('register', {
                message: 'User already registered.',
                messageClass: 'alert-danger'
            });

            return;
        }

        const hashedPassword = getHashedPassword(password);

        // Store user into the database if you are using one
        users.push({
            email,
            password: hashedPassword
        });

        res.render('login', {
            message: 'Registration Complete. Please login to continue.',
            messageClass: 'alert-success'
        });
    } else {
        res.render('register', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }
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