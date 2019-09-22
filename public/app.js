// Grab the questions as a json
$.getJSON("/questions", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      $("#questions").append("<li data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</li>" + "<br />" + "<br />" );
    }
  });
  
  // Whenever someone clicks an li tag
  $(document).on("click", "li", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/questions/" + thisId
    })
      // Add the note information to the page
      .then(function(data) {
        console.log(data);
        $("#notes").append("<h5>" + data.title + "</h5>");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/questions/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        // Log the response
        console.log(data);
        $("#notes").empty();
      });
  
      
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });