$(document).ready(() => {
    $('#next-button').hide().fadeIn(1500);
    $('#main-splash').hide().fadeIn(1000);
    $("header").css("background-color", "transparent");
    $(".menu-active .home").css("color", "#70A861");
    $(".home:not(.menu-active)").hover(function() {
        $(this).css("color", "#70A861");
    }, function() {
        $(this).css("color", "#041315");
    });

    $(window).scroll(function () {
        var bottom_of_object = $( "#main-splash" ).offset().top +  $( "#main-splash" ).height();
        var top_of_window = $(window).scrollTop();

        /* navbar appearing and disappearing */
        /* & splash leaves zooming out when scroll down */
        if (top_of_window < bottom_of_object) {
            $("header").css("background-color", "transparent");
            $(".menu-active").css("color", "#70A861");
            $( "#next-button" ).show();
            $(".home:not(.menu-active)").hover(function() {
                $(this).css("color", "#70A861");
            }, function() {
                $(this).css("color", "#041315");
            });
        } else {
            $("header").css("background-color", "#70A861");
            $(".menu-active").css("color", "#E3E1E1");
            $(".home:not(.menu-active)").hover(function() {
                $(this).css("color", "white");
            }, function() {
                $(this).css("color", "#041315");
            });
        } 
    });

    $( "#next-button" ).on('click', function() {
        $( "#next-button" ).hide();

        if ($(window).width() >= 760){
            $("html,body").delay(250).animate({"scrollTop": $( "#aboutSection" ).offset().top}, 500);
        } else {
            $("html,body").delay(250).animate({"scrollTop": $( "#aboutSectionHeader" ).offset().top - 100}, 500);
        }
    })
});

