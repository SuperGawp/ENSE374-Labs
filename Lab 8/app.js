// Bring in mongoose
const mongoose = require( 'mongoose' );

// connects to the "test" database (ensure mongod is running!)
// the later arguments fix some deprecation warnings
mongoose.connect( 'mongodb://localhost:27017/test', 
                  { useNewUrlParser: true, useUnifiedTopology: true });

// create a schema
const Cat = mongoose.model( 'Cat', { name: String });

// create a document following that schema
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then( () => console.log('meow') );
