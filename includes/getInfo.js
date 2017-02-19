/**
 * Created by tomerktzv on 14/02/2017.
 */
$("document").ready(function() {
    var currentUrl = window.location.href;
    var newUrl;
    var whereItIs = window.location.href.indexOf('ID=111111');
    var concatUrl = window.location.href.substring(whereItIs, window.location.href.length);
    // var userid = 'ID=111111';
    var userid = concatUrl.substring(concatUrl.indexOf('?ID=')+1, concatUrl.indexOf('?ID=')+10);

    $.ajax({
        type: 'POST',
        url: 'getUser.php',
        data: userid,
        cache: true,
        success: function (data) {
            if (data) {
              $('#menuList li:first-child p').html(data);
            }
        }
    });

    $.getJSON('includes/user.json', function (data) {
        var navbar = $('#navBar');
        var headerbar = $('header');
        $.each(data, function (key, value) {
            if (value.ID == 111111){
                $('#menuList li:first-child img').attr('src', value.imgSrc);
                if (window.location.href.indexOf('111111') == -1) {
                    currentUrl = $(location).attr('href') + '?' + 'ID=' + value.ID;
                    $(location).attr('href', currentUrl);
                }
                var concatUrl = window.location.href.substring(whereItIs, window.location.href.length);
                $("a").each(function() {
                    if ($(this).attr('href') != '#' &&  !($(this).parents().is(navbar) || $(this).parents().is(headerbar))) {
                        if ($('body').attr('id') != 'walkConfirmed') {
                            if ($('body').attr('id') != 'sentRequest') {
                                newURL = $(this).attr('href') + '?' + concatUrl;
                                $(this).attr('href', newURL);
                            }
                        }
                    }
                });
            }
            if ($('body').attr('id') == 'findAwalker1') {
                if (value.DogID == 222) {
                    $('#getDogImg').attr('src', value.dogImgSrc);
                    $('#getDogName').html('Continue as ' + value.Name);
                    $('#getDogName').css({'display' : 'block'});
                    if ($('body').attr('id') == 'findAwalker1') {
                        var newDogUrl = $('#getDogName').attr('href') + '&DogID=' + value.DogID;
                        $('#getDogName').attr('href', newDogUrl);
                    }
                }
            }
            else if ($('body').attr('id') == 'getDoggerz') {
                if (value.ID == 123) {
                    $('#getUserSrc').attr('src', value.imgSrc);
                }
            }
        });
    });

    $('#continue').on('click', function () {
        var startDate = new Date($('#dateStart').val());
        var endDate = new Date($('#dateEnd').val());
        var length = (endDate.getTime()-startDate.getTime())/60000;
        if ($('body').attr('id') == 'findAwalker2') {
            newUrl = $(this).attr('href') + '&StartTime=' + $('#dateStart').val() + '&length=' + length;
            $(this).attr('href', newUrl);
        }
    });

    $('#continueMaps2').on('click', function () {
        var address = $('#pac-input').val();
        var radius = $('#radiusInput').val();
        if ($('body').attr('id') == 'mapPlanAWalk') {
            newUrl = $(this).attr('href') + '&Start=' + address + '&radius=' + radius;
            $(this).attr('href', newUrl);
        }
    });

    $('#continueMaps').on('click', function () {
        var address = $('#pac-input').val();
        if ($('body').attr('id') == 'mapPage') {
            newUrl = $(this).attr('href') + '&Start=' + address;
            $(this).attr('href', newUrl);
        }
    });

    $(function () {
        var stars = function (object, rate) {
            for (i = 1; i <= 5; i++) {
                if (i <= rate)
                    object.append('<span class="glyphicon glyphicon-star" aria-hidden="true"></span> ');
                else
                    object.append('<span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> ');
            }
        };

        if ($('body').attr('id') == 'showWalker') {
            concatUrl = concatUrl.replace(/%20/g, ' ');
            var startLocation = (concatUrl.substring(concatUrl.indexOf('Start='), concatUrl.indexOf('&rad')));
            startLocation = $('main h2:nth-child(2)').html() + startLocation.substring(6, startLocation.length);
            var rad = (concatUrl.substring(concatUrl.indexOf('radius='), concatUrl.indexOf('&Max')));
            rad = rad.substring(7, rad.length);
            var maxDogs = (concatUrl.substring(concatUrl.indexOf('MaxDogs='), concatUrl.indexOf('&Signed')));
            maxDogs = maxDogs.substring(8, maxDogs.length);
            $('main h2:nth-child(2)').html(startLocation);
            $('main h2:nth-child(3)').html($('main h2:nth-child(3)').html().replace("?", rad));
            $('main h2:nth-child(4)').html($('main h2:nth-child(4)').html().replace("?", maxDogs));
        }

        if ($('body').attr('id') == 'getDoggerz') {
            var amount;
            var id = concatUrl.substring(concatUrl.indexOf('ID='), concatUrl.indexOf('&DogID'));
            $.ajax({
                type: 'POST',
                url: 'getAmount.php',
                data: id,
                cache: true,
                success: function (data) {
                    if (data) {
                        amount = data;
                        if (data == 0){
                            $('main h1').html("No Doggerz were found according to the details you've entered");
                        }
                        $('main h1').html(data + " Doggerz are available to you");

                    }
                }
            });
            var names;
            $.ajax({
               type: 'POST',
                url: 'getNames.php',
                cache: true,
                success: function (data) {
                    names = data;
                    names = names.split(',');
                    $.getJSON('includes/user.json', function (data) {
                        var i = 0;
                        $.each(data, function (key, value) {
                            if (value.Name == 'Moshe Cohen' || value.Name == 'Louie') {

                            }
                            else {
                                $('main > article').append("<section id=" + i + "></section>");
                                $('#' + i).append("<section></section>");
                                if (names[i] == 'Yossi Efraim') {
                                    $('#' + i + ' section').append('<a href="yossi.html?'+ concatUrl + '"></a>');
                                }
                                else {
                                    $('#' + i + ' section').append('<a href="#"></a>');
                                }
                                $('#' + i + ' section a').append('<img src=' + value.imgSrc + '>');
                                $('#' + i + ' section a').append(names[i]);
                                $('#' + i).append("<p>" + (i + (i * 1.2)) + " kilometers from you</p>");
                                i++;
                            }
                        });
                    });
                }

            });
        }

        if ($('body').attr('id') == 'yossiProfile') {
            $.ajax({
                type: 'POST',
                url: 'getName.php',
                cache: true,
                success: function (html) {
                    $('main h1').html(html);
                    $.getJSON('includes/user.json', function (data) {
                        $.each(data, function (key, value) {
                            if (value.Name == html) {
                                $('main img:nth-child(2)').attr('src', value.imgSrc2);
                            }
                        });
                    });
                }
            });
            $.ajax({
                type: 'POST',
                url: 'getYossi.php',
                cache: true,
                success: function (data) {
                    var info = data;
                    info = info.split(',');
                    $('main section:nth-child(3) p:nth-child(1)').html(info[0] + ', ' + info[1]);
                    $('main section:nth-child(3) p:nth-child(2)').html(info[2]);
                    $('main section:nth-child(3) p:nth-child(3)').html('2.2 kilometers from you');
                }
            });
            $.ajax({
                type: 'POST',
                url: 'getLouie.php',
                cache: true,
                success: function(data) {
                    var dogInfo = data;
                    dogInfo = dogInfo.split(',');
                    $('main h2').html(dogInfo[0]);
                    $('main section:nth-child(6) p').html(dogInfo[1] + ', ' + dogInfo[2]);
                    $.getJSON('includes/user.json', function (info) {
                        $.each(info, function (key, value) {
                            if (value.Name == 'Louie') {
                                $('main img:nth-child(5)').attr('src', value.dogImgSrc);
                            }
                        });
                    });
                }
            });
        }

        if ($('body').attr('id') == 'viewRating') {
            var dogRating;
            var userRating;



            $.ajax({
                type: 'POST',
                url: 'getRating.php',
                cache: true,
                success: function (data) {
                    userRating = data;
                    userRating = userRating.split(',');
                    $('section:nth-child(2) ul:nth-child(2) li:nth-child(1)').html(userRating[userRating.length-1]);
                    var total = $('section:nth-child(2) ul:nth-child(2) li:nth-child(2)');
                    total.html(total.html().replace('?', userRating[1]));
                    stars(total, userRating[1]);
                    $('section:nth-child(2) ul:nth-child(2) li:nth-child(3)').html('<a href="contactDogger.html">More Information</a>');
                    var rates = $('section:nth-child(2) ul:nth-child(3) li:nth-child(1)');
                    rates.html(rates.html().replace('?', userRating[2]));
                    rates = $('section:nth-child(2) ul:nth-child(4) li:nth-child(1)');
                    stars(rates, userRating[2]);
                    rates = $('section:nth-child(2) ul:nth-child(3) li:nth-child(2)');
                    rates.html(rates.html().replace('?', userRating[3]));
                    rates = $('section:nth-child(2) ul:nth-child(4) li:nth-child(2)');
                    stars(rates, userRating[3]);
                    rates = $('section:nth-child(2) ul:nth-child(3) li:nth-child(3)');
                    rates.html(rates.html().replace('?', userRating[3]));
                    rates = $('section:nth-child(2) ul:nth-child(4) li:nth-child(3)');
                    stars(rates, userRating[3]);
                    $.getJSON('includes/user.json', function (info) {
                        $.each(info, function (key, value) {
                            if (value.ID == '111111') {
                                $('section:nth-child(2) img').attr('src', value.imgSrc);
                            }
                        });
                    });
                }
            });

            $.ajax({
                type: 'POST',
                url: 'getDogRating.php',
                cache: true,
                success: function (data) {
                    dogRating = data;
                    dogRating = dogRating.split(',');
                    $('section:nth-child(3) ul:nth-child(2) li:nth-child(1)').html(dogRating[dogRating.length-1]);
                    var total = $('section:nth-child(3) ul:nth-child(2) li:nth-child(2)');
                    total.html(total.html().replace('?', dogRating[1]));
                    stars(total, dogRating[1]);
                    $('section:nth-child(3) ul:nth-child(2) li:nth-child(3)').html('<a href="#.html">More Information</a>');
                    var rates = $('section:nth-child(3) ul:nth-child(3) li:nth-child(1)');
                    rates.html(rates.html().replace('?', dogRating[2]));
                    rates = $('section:nth-child(3) ul:nth-child(4) li:nth-child(1)');
                    stars(rates, dogRating[2]);
                    rates = $('section:nth-child(3) ul:nth-child(3) li:nth-child(2)');
                    rates.html(rates.html().replace('?', dogRating[3]));
                    rates = $('section:nth-child(3) ul:nth-child(4) li:nth-child(2)');
                    stars(rates, dogRating[3]);
                    rates = $('section:nth-child(3) ul:nth-child(3) li:nth-child(3)');
                    rates.html(rates.html().replace('?', dogRating[4]));
                    rates = $('section:nth-child(3) ul:nth-child(4) li:nth-child(3)');
                    stars(rates, dogRating[4]);
                    $.getJSON('includes/user.json', function (info) {
                        $.each(info, function (key, value) {
                            if (value.DogID == '222') {
                                $('section:nth-child(3) img').attr('src', value.dogImgSrc);
                            }
                        });
                    });
                }
            });
        }

        if ($('body').attr('id') == 'contactDoggerz') {
            var toID = 321;
            $.ajax({
                type: 'POST',
                url: 'getMessage.php',
                data: toID,
                cache: true,
                success: function (data) {
                    var msgInfo = data;
                    msgInfo = msgInfo.split(',');
                    console.log(msgInfo);
                    $('section h2 a').html(msgInfo[msgInfo.length-1]);
                    $.getJSON('includes/user.json', function (info) {
                        $.each(info, function (key, value) {
                            if (value.ID == msgInfo[0]) {
                                $('section img').attr('src', value.imgSrc);

                            }
                        });
                    });
                    $('section ul li:nth-child(1)').html(msgInfo[msgInfo.length-4]);
                    $('section ul li:nth-child(2)').html(msgInfo[msgInfo.length-3]);
                    stars($('section ul li:nth-child(3)'), msgInfo[msgInfo.length-2]);
                    var msg;
                    for (i = 2; i < msgInfo.length-4; i++) {
                        if (i == 2) {
                            msg = msgInfo[i];
                        }
                        else {
                            msg = msg + msgInfo[i];
                        }
                    }
                    $('section article').html('<p>' + msg + '</p>');
                }
            });
        }

        if ($('body').attr('id') == 'sendReply') {
            var toID = concatUrl.substring(concatUrl.indexOf('toID=') + 5, concatUrl.length);
            $.getJSON('includes/user.json', function (info) {
                $.each(info, function (key, value) {
                    if (value.ID == toID) {
                        $('form h2').html('Sending to: ' + value.Name);
                    }
                });
            });
        }
    });


    $('#continueMsg').on('click', function () {
        $(this).css({'text-decoration' : 'none'});
        var inp2 = $('section textarea');
        if (inp2.val() == '') {
            inp2.css({'border' : '4px solid darkred'});
            event.preventDefault();
        }
        else
            inp2.css({'border' : '1px solid black'});
        var toID = concatUrl.substring(concatUrl.indexOf('toID=') + 5, concatUrl.length);
        var fromID = concatUrl.substring(concatUrl.indexOf('ID=') + 3, concatUrl.indexOf('&to'));
        var msg = inp2.val();
        var date1 = new Date();
        var msgDate = date1.toString();
        msgDate = msgDate.split(' ');
        date1 = msgDate[0] + ' ' + msgDate[1] + ' ' + msgDate[2] + ' ' + msgDate[3];
        var hour = msgDate[4];
        var rate = 0;
        $.ajax({
            type: 'POST',
            url: 'sendMsg.php',
            data : {
                fromID : fromID,
                toID : toID,
                message : msg,
                date : date1,
                time : hour,
                rate : rate
            },
            success: function (data) {
            }
        });
    });

    $('#nameOf').on('click', function () {
        var withID = $('#nameOf').attr('href') + '&toID=321';
        $('#nameOf').attr('href', withID);
    });

    $('#buttonTest').on('click', function () {
        var id = concatUrl.substring(concatUrl.indexOf('ID=')+3, concatUrl.indexOf('&DogID'));
        var dogID = concatUrl.substring(concatUrl.indexOf('&DogID')+7, concatUrl.indexOf('&StartTime'));
        var startTime = concatUrl.substring(concatUrl.indexOf('&StartTime')+11, concatUrl.indexOf('&length'));
        startTime = startTime.replace(/T/g, ' ');
        var length = concatUrl.substring(concatUrl.indexOf('&length')+8, concatUrl.indexOf('&Start='));
        var start = concatUrl.substring(concatUrl.indexOf('&Start=')+7, concatUrl.indexOf('&rad'));
        var radius = concatUrl.substring(concatUrl.indexOf('&radius=')+8, concatUrl.indexOf('&MaxDogs'));
        var maxDogs = concatUrl.substring(concatUrl.indexOf('&MaxDogs=')+9, concatUrl.indexOf('&Signed'));
        var signedDogs = concatUrl.substring(concatUrl.indexOf('&Signed')+12, concatUrl.length);
        $.ajax({
            type: 'POST',
            url: 'createWalk.php',
            data : {
                Start : start,
                UserID : id,
                Radius : radius,
                MaxDogs : maxDogs,
                SignedDogs : signedDogs,
                StartTime : startTime,
                length : length
            },
            success: function (data) {
            }
        });
    });

});