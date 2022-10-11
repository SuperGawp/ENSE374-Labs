var personList = [];

function Person (id, name, color) {
    // todo: set our id, name and color!
}

$(document).ready( () => {
    $( "#add-button" ).click ( () => {
        //todo: create a new person with appropriate ID, name and default color 
        // get currentID, name and set a default color here!
        // use the array index as the id, e.g. 0,1,2... etc.
        // find the textbox, and use the jQuery .val() function to get its value
        // use the default color of "black"
        var person = new Person(id, name, color);
        personList.push(person);
        buildList();
    });
});

function setColor (id, color) {
    // todo: find the person matching the ID and update the color 
}

function buildList () {
    // remove all contents from the insertion point
    $( "#insertion-point" ).empty();
    // loop over list of people...
    for (let person of personList) {

        // append the persons name, in a <span>. Add the persons color to the span's class list.
        // hint, use template literals!

        // Create the RED button
        // Register a callback function so that, if it is pressed, we will update the model
        // so that the persons' favourite color is stored in the model, then rebuild the list.

        // Don't forget to add the RED button to the DOM!

        // Ditto GREEN button
        
        // Ditto BLUE button
        
        $( "#insertion-point" ).append( `<br>` );
        
    }
    
}

