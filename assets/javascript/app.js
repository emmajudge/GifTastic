// Initial array of gifs
var gifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displaygifInfo function re-renders the HTML to display the appropriate content
function displaygifInfo() {

    var apiKey = "FZxzn2uitVa58gSRHrcGsaE8z0ZtXZBL";
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey + "&limit=10";

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // $("#gifs-view").empty();
        // <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
        
        $("#gifs-view").empty();

        for (var i = 0; i < response.data.length; i++) {
            var rating = $("<div>");
            rating.html("gif rating: " + response.data[i].rating);
            $("#gifs-view").append(rating);
            
            var image = $("<img>");
            image.attr("src", response.data[i].images.original_still.url);
            image.attr("data-still", response.data[i].images.original_still.url);
            image.attr("data-animate", response.data[i].images.original.url);
            image.attr("data-state", "still");
            image.attr("class","gif");

            
            $("#gifs-view").append(image);
           
        }

     $(".gif").on("click", function(){
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");


        if(state === "still"){
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }
        else{
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
     })


    });

    // Puts the entire gif above the previous gifs.


}

// Function for displaying gif data
function renderButtons() {

    // Deletes the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of gif to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", gifs[i]);
        // Provided the initial button text
        a.text(gifs[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The gif from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displaygifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();