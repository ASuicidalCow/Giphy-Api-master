// create an array of animals
var animals = ["dog", "cat", "koala", "iguana", "turtle", "salamander", "fish", "bird",];

var animalBtn;

var animalImage;

function createButtons() {

  $("#animal-btn-div").empty();

  for (var i = 0; i < animals.length; i++) {

    var animalBtn = $("<button>");

    animalBtn.addClass("btn btn-primary p-2 mr-3 mb-2 animal-btn");

    animalBtn.text(animals[i]);

    animalBtn.attr("data-name", animals[i]);

    

    $("#animal-btn-div").append(animalBtn);
  }
} 
function displayAnimalImages() {

  $("#results-div-col1").empty();
  $("#results-div-col2").empty();
  $("#results-div-col3").empty();
  $("#click-to-play-text").empty();


  var animal = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=79gowOpodV0TWmPUz2HazCskPfvnY5FM&limit=11";

  // Create AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
  .done(function (response) {

    console.log(response);
    var results = response.data;


    $("#click-to-play-text").append("<h4>" + "Click a gif to play. Click again to pause." + "</h4>");

    for (var i = 0; i < results.length; i++) {

      // Only take action if the gif has an appropriate rating. 
      // This should not matter. Did extensive testing on this site and did not find pg-13 or r rated gifs for any of the animals tested.
      //But, adding this if statement just in case...
      if (results[i].rating !== "r" ) {

        //Create div element to hold gif image.. 
        var gifDiv = $("<div class='item'>");

        //Save results[i].rating property. Store in rating variable.
        var rating = results[i].rating;

        //Display rating of gif.
        var p = $("<p>").text("Rating: " + rating);

        //Need to give each gif/image some attributes so that the user can play and pause a gif on demand.
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        animalImage.addClass("img-fluid gif border border-primary");

        //Prepend rating paragraph to the div that was created to hold the gif image.
        gifDiv.prepend(p);
        //Prepend gif image to the div that was created to hold the gif image.
        gifDiv.prepend(animalImage);

        //Add the first three gifs retrieved from the GIPHY API call to the results-div-col1 column in the HTML.
        if (i >= 0 && i < 3) {
          $("#results-div-col1").append(gifDiv);
        }

        //Then, add the next four gifs retrieved from the GIPHY API call to the results-div-col2 column in the HTML.
        else if (i >= 3 && i < 7) {
          $("#results-div-col2").append(gifDiv);
        }

        //Finally, add the last three gifs retrieved from the GIPHY API call to the results-div-col3 column in the HTML.
        else {
          $("#results-div-col3").append(gifDiv);
        }
      }
    }

    //When the user clicks a gif in the search results section...
    $(".gif").on("click", function () {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element.
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


  });
}
$("#submit-button").on("click", function (event) {

  //The following code prevents the submit/add button from trying to submit the form.
  //Using a form so that the user can press Enter to search instead of clicking the button.
  event.preventDefault();
  //Grab the input from the text box and change the value to lower case.
  var animalInput = $("#animal-input").val().toLowerCase();

  //Remove the animal's name from text box after user clicks add/submit-button.
  $("#animal-input").val("");

  //If the input from the search box is already in the animals array, alert to the user that the animal is already available.
  if (animals.indexOf(animalInput) > -1) {
    alert(animalInput + " is already available.");
  }

  //If text box is empty, don't create button. Nothing should happen when user clicks Add icon.
  else if (animalInput === "" || animalInput === null) {
    return false;
  }

  //else if the input from the search box is not in the animals array, add animal to animals array and create button for animal.
  else if (animals.indexOf(animalInput) === -1) {
    //add or push animalInput from text box to animals array.
    animals.push(animalInput);
    console.log(animals);
    //call createButtons, which handles the processing of animals array.
    createButtons();
  }
});
createButtons();

//Create click event for all elements with a class of animal-btn.
$(document).on("click", ".animal-btn", displayAnimalImages);
