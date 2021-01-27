var i = 0;
var x = 0;
var y = 0;
var dis = 200;

function update(e, deg){
    $('body').append("<img class='footprints" + i + "' src='../assets/img/footprints.png'></img>");
    $('.footprints' + i).css({
        width: '7%',
        zIndex: '0',
        position: 'absolute',
        left: e.pageX,
        top: e.pageY,
        cursor: 'default',
        opacity: '0.5',
        "-webkit-transform": "rotate(" +  deg + "deg)",
        "-moz-transform": "rotate(" +  deg + "deg)",
        "transform": "rotate(" +  deg + "deg)"
    }).delay(1000).fadeOut(1000).queue(function() {
        $(this).remove();
    });;
    x = e.pageX;
    y = e.pageY;
    i++;
}

$('html, body').mousemove(function(e) {
    var footer_top = $( "footer" ).offset().top;

    if(e.pageY < footer_top){
        if(e.pageY - y > dis){
            update(e, '180');
        } else if(e.pageY - y < -dis){
            update(e, '0');
        } else if(e.pageX - x > dis){
            update(e, '90');
        } else if(e.pageX - x < -dis){
            update(e, '270');
        }
    }
    if(i == 50){
        i = 1;
    }
});
