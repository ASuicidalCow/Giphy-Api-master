$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=79gowOpodV0TWmPUz2HazCskPfvnY5FM&limit=10";


      // Step 0.5 Create AJAX call
      $.ajax({
        url: queryURL,
        method: "get"
      }).then(function(response){
      // Open up the data set. Study the keys and how the JSON is structured.
      console.log(response)
      // make a variable named results and set it equal to response.data
        var results = response.data;

       for (var i = 0; i < results.length; i++) {
      
       var animalDiv = $("<div>");

      // Make a paragraph tag with jQuery and store it in a variable named p.
        var p = $("<p>").text("rating: " + results[i].rating);
      // Set the inner text of the paragraph (p) to the rating of the image in results[i].

      // Make an image tag with jQuery and store it in a variable named animalImage.
          var animalImage = $("<img>");
      // Set the image's src to results[i]'s fixed_height.url.
          animalImage.attr("src", results[i].images.fixed_height.url);
      // Append the p variable to the animalDiv variable.
          animalDiv.append(p);
      // Append the animalImage variable to the animalDiv variable.
          animalDiv.append(animalImage);
      // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
          $("#gifs-appear-here").prepend(animalDiv);
      
       }
      });

