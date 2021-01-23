let popcolor = "#86B1BA";
let origcolor = "black";
let background = "#E3E1E1";

$(document).ready(() => {
    $("#day-2").slideUp();
    $("#day-3").slideUp();
    $(".speaker-info *").toggle();

    $("#day-1Anchor").click(function () {
        $("#day-1").slideDown();
        $("#day-2").slideUp();
        $("#day-3").slideUp();
        $("#day-1Anchor").css("background-color", popcolor);
        $("#day-2Anchor").css("background-color", origcolor);
        $("#day-3Anchor").css("background-color", origcolor);
        $('body').animate({scrollTop:30}, 'slow');
    });

    $("#day-2Anchor").click(function () {
        $("#day-1").slideUp();
        $("#day-2").slideDown();
        $("#day-3").slideUp();
        $("#day-1Anchor").css("background-color", origcolor);
        $("#day-2Anchor").css("background-color", popcolor);
        $("#day-3Anchor").css("background-color", origcolor);
    });

    $("#day-3Anchor").click(function () {
        $("#day-1").slideUp();
        $("#day-2").slideUp();
        $("#day-3").slideDown();
        $("#day-1Anchor").css("background-color", origcolor);
        $("#day-2Anchor").css("background-color", origcolor);
        $("#day-3Anchor").css("background-color", popcolor);
    });

    $( ".workshop").click(function() {
        $(".workshop").css("background-color", "black");
        $(".workshop").css("transition", "all ease-in-out 0.3s");
        var speaker = $(this).attr('id');
        $(".speaker-info *").slideUp("fast");
        if(!$(".speaker-info #"+speaker).is(":visible")){
            $(".speaker-info #"+speaker).slideDown("fast");
            $(this).css("background-color", popcolor);
        }
    });
});

$(function() {
    let navTop = $('.day-title').offset().top - 200; 

    $(window).scroll(function() {
        let currentScroll = $(window).scrollTop() + 120; // get current position

        if (currentScroll >= navTop) {           // apply position: fixed if you
            $('.nav-tabs').css({                      // scroll to that element or below it
                position: 'fixed',
                top: $(header).height(),
                zIndex: 80,
                width: '100%',
                left: 0
            });
        } else {                                   // apply position: static
            $('.nav-tabs').css({                      // if you scroll above it
                position: 'static'
            });
        }
    });
});


