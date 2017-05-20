var GifTastic = function() {
    var LIMIT = 10;
    var APIKey = 'dc6zaTOxFJmzC';
    var query;
    var buttons = ['monkey', 'snake', 'hawk', 'elephant', 'cat', 'puppy', 'training day', 'the matrix', 'super troopers',
        'batman', 'superman', 'wonder woman', 'spiderman', 'turtle'];
    var data;
    // calls makeButtons() function
    makeButtons(buttons);
    // function to make the buttons for specific gifs
    function makeButtons(buttonList) {
        $('.gif-btn').off();
        $('#buttons').empty();
        $.each(buttonList, function(i, v) {
            var newButton = $('<button>').addClass('gif-btn btn btn-default').attr('gif-data', v).attr('id', i);
            newButton.html(v);
            $('#buttons').prepend(newButton);
        });

        // on button click
        $('.gif-btn').on('click', function() {
            // remove previous click listener on gifs
            $('img.gif-img').off();
            // empty #gifs
            $('#gifs').empty();
            // get gif-data from button clicked, store in query`
            query = ($(this).attr('gif-data'));
            // call getGifs() function
            getGifs(query, LIMIT);
        });
    }
    // uses ajax to get gifs from giphy api
    function getGifs(query, limit) {
        // replace white space with '+' in query for the Giphy request
        query = query.replace(' ', '+');
        // creates url using provided query, limit, and APIKey
        var url = 'https://api.giphy.com/v1/gifs/search?q=' + query + '&limit=' + limit + '&api_key=' + APIKey;
        // declare ajaxSettings
        var ajaxSettings = {
            url: url,
            method: 'GET'
        }
        // ajax call
        $.ajax(ajaxSettings).done(function(response) {
            data = response.data;
            // pass the data from ajax request to showGifs() function
            showGifs(data);
        });
    }
    // builds the gifs from the data and displays them
    function showGifs(data) {
        var stillUrl, animatedUrl, newImgBox, newImg, newRating;
        $.each(data, function(i, v) {
            stillUrl = v.images.fixed_height_still.url;
            animatedUrl = v.images.fixed_height.url;
            // creates a div to wrap the img and rating
            newImgBox = $('<div>').addClass('gif-box col-md-4');
            // creates the img tag
            newImg = $('<img>').attr('src', stillUrl).addClass('gif-img img-responsive');
            newImg.attr('data-still', stillUrl).attr('data-animate', animatedUrl);
            newRating = $('<p>').html('Rating: ' + v.rating.toUpperCase());
            newImgBox.html(newImg);
            newImgBox.append(newRating);
            $('#gifs').append(newImgBox);
        });

        // change still/animated state on gif click
        $('img.gif-img').on('click', function() {
            var state = $(this).attr('src');
            var still = $(this).attr('data-still');
            var anim = $(this).attr('data-animate');

            if (state === still) {
                $(this).attr('src', anim);
            } else if (state === anim) {
                $(this).attr('src', still);
            }
        });
    }

    // click listener for submit btn to add a new gif topic
    $('#add-new-btn').on('click', function(e) {
        e.preventDefault();
        // get val() from input form field, store in newInputVal
        var newInputVal = $('#add-new-inp').val();
        // pushes newInputVal into the buttons arr
        buttons.push(newInputVal);
        // remake buttons in display
        makeButtons(buttons);
        // empties the input field
        $('#add-new-inp').val('');
    });
};

// onload, call the GifTastic function
window.onload = GifTastic();
