function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

$("document").ready(function() {
    $('#menuButton').on('click', function () {
        if ($('#navBar').css('display') == 'none') {
            $('#navBar').css({'display' : 'block'});
            $('#navBar').css({'border' : '1px solid #333333'});
            // $('#navBar').animate({'width': '70%'});
            $('#navBar').animate({'height' : '450px'});
            // $('#navBar').animate({'height' : '86.2%'});
            $('#menuList').css({'display' : 'block'});
        }
        else {
            // $('#navBar').animate({'width': '0px'});
            $('#navBar').animate({'height' : '0'});
            $('#navBar').css({'border' : 'none'});
            $('#menuList').delay(300).queue(function (next) {
                $(this).hide();
                next();
            });
            $('#navBar').delay(0).queue(function (next) {
                $(this).hide();
                next();
            });
        }

    });

    $('#continue').on('click', function () {
        errors = false;
        var start = $('#dateStart').val();
        var end = $('#dateEnd').val();

        var startDate = new Date(start);
        var endDate = new Date(end);
        if (startDate.getTime() < endDate.getTime() && endDate.getTime()-startDate.getTime() <= 18000000) {
        }
        else {
            $('#errors').css({'display':'block'});
            errors = true;
        }
        if (errors) {
            event.preventDefault();
        }
    });


    $('#continueMaps').on('click', function () {
        errors = false;
        if ($('#pac-input').val() == "") {
            $('#pac-input').css({'border': '3px solid darkred'});
            errors = true;
        }
        else {
            $('#pac-input').css({'border': '1px solid #333333'});
        }
        if (errors)
            event.preventDefault();
    });

    $('#continueMaps2').on('click', function () {
        errors = false;
        if ($('#pac-input').val() == "") {
            $('#pac-input').css({'border': '3px solid darkred'});
            errors = true;
        }
        else {
            $('#pac-input').css({'border': '1px solid #333333'});
        }
        if ($('#radiusInput').val() == "") {
            $('#radiusInput').css({'border': '3px solid darkred'});
            errors = true;
            $('#errors').css({'display':'block'});
            $('#errors').html('<h3>Walking radius is invalid!</h3>');
        }
        else if ($('#radiusInput').val() > 10) {
            $('#radiusInput').css({'border': '3px solid darkred'});
            errors = true;
            $('#errors').css({'display':'block'});
            $('#errors').html('<h3>Walking radius is too big!</h3>');
        }

        else {
            $('#radiusInput').css({'border': '1px solid #333333'});
        }

        if (errors)
            event.preventDefault();


    });
});

$("document").ready(function() {
    var amountOfDogs = 0;
    $('#addDog').on('click', function () {
        if (amountOfDogs < 10) {
            $('section article:nth-child(' + (amountOfDogs+1) + ')').css({'background-image' : 'url("images/dogi6.png")'});
            $('section article:nth-child(' + (amountOfDogs+1) + ')').css({'background-color' : '#008000'});
            amountOfDogs++;
            $('main > h3').html("Amount Of Dogs: " + amountOfDogs);
            if (amountOfDogs == 1 && $('#errors').css('display') == 'block') {
                $('#errors').html('');
                $('#errors').css({'display' : 'none'});
            }
        }
    });

    $('#removeDog').on('click', function () {
       if (amountOfDogs > 0) {
           $('section article:nth-child(' + (amountOfDogs) + ')').css({'background-image' : 'url("images/dogi4.png")'});
           $('section article:nth-child(' + (amountOfDogs) + ')').css({'background-color' : 'transparent'});
           amountOfDogs--;
           $('main > h3').html("Amount Of Dogs: " + amountOfDogs);
           console.log("dog removed")
       }
    });

    $('#continueDogs').on('click', function () {
        errors = false;
        if (amountOfDogs == 0) {
            errors = true;
            $('#errors').css({'display':'block'});
            $('#errors').html('<h3>Need to be able to walk with at least one dog!</h3>');
        }
        if (errors)
            event.preventDefault();
        var newUrl = $('#continueDogs').attr('href') + '&MaxDogs=' + amountOfDogs + '&SignedDogs=0';
        console.log(newUrl);
        $(this).attr('href', newUrl);
    });
});