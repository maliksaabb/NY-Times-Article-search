// VARIABLES
var apiKey = "R8sTPGGEb5eVu0LFMQRGbGHOnGj61Sao";
var queryURL = "";
var numRecords = "";
var startYear = "";
var endYear = "";

// Clear all fields on Clear click
$('#clearBtn').on("click", function(event) {
    search = $('#searchTerm').val("");
    numRecords = $('#records').val("");
    startYear = $('#yearOne').val("");
    endYear = $('#yearTwo').val("");
    $('li').remove();
});

// When the Search button is clicked
$('#searchBtn').on("click", function(event) {
    // Get values from the form fields
    search = $('#searchTerm').val();
    numRecords = $('#records').val();
    startYear = $('#yearOne').val();
    endYear = $('#yearTwo').val();

    // Set query URL
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
        search + "&api-key=" + apiKey;
    // Add to query URL if a Start Year is entered
    if (startYear) { 
        beginDate = startYear + "0101";
        queryURL = queryURL + "&facet_fields=source&facet=true&begin_date=" + beginDate;
    } 
    // Add to query URL if an End Year is entered
    if (endYear) {
        endDate = endYear + "0101";
        queryURL = queryURL + "&end_date=" + endDate;
    }

    console.log(queryURL);

    // AJAX Request
    $.ajax({
        url: queryURL,
        method: "GET"
        })
        // After data comes back from the request
        .then(function(results) {
            // If the user entered a Number of Records to Retrieve
            if(numRecords) {
                for (i = 0; i < numRecords; i++) {
                    // Get the article information
                    article = results.response.docs[i];
                    console.log(article);
                    title = article.headline.main;
                    byline = article.byline.original;
                    section = article.section_name;
                    url = article.web_url;
                    pubDate = article.pub_date;

                    // Setup new li element and append to the #results div
                    var listItem = $("<li><h4>" + title + "</h4><br>"
                    + "<p>" + byline + "</p>"
                    + "<p>" + pubDate + "</p>"
                    + '<p class="h6">' + section + "</p>"
                    + "<p>" + url + "</p>"
                    + "</li>");
                    listItem.addClass("list-group-item");
                    $('#results').append(listItem);
                } 
            } else {
                // No Number of Records entered, retrieve 10 since that is the max per API
                for (i = 0; i < 10; i++) {
                    // Get the article information
                    article = results.response.docs[i];
                    console.log(article);
                    title = article.headline.main;
                    byline = article.byline.original;
                    section = article.section_name;
                    url = article.web_url;
                    pubDate = article.pub_date;

                    // Setup new li element and append to the #results div
                    var listItem = $("<li><h4>" + title + "</h4><br>"
                    + "<p>" + byline + "</p>"
                    + "<p>" + pubDate + "</p>"
                    + '<p class="h6">' + section + "</p>"
                    + "<p>" + url + "</p>"
                    + "</li>");
                    listItem.addClass("list-group-item");
                    $('#results').append(listItem);
                }
            }

        });
});