

/*=============================================================
    Authour URI: www.binarytheme.com
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% Free To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDIT US AND TELL YOUR FRIENDS ABOUT US

    ========================================================  */

(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
               SLIDER SCRIPTS
               ======================================*/
            $('#carousel-slider').carousel({
                interval: 3000 //TIME IN MILLI SECONDS
            });
            /*====================================
                SCROLLING SCRIPTS
                ======================================*/

            $(function () {
                $('.scrollclass a').bind('click', function (event) { //just pass scrollclass in design and start scrolling
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1200, 'easeInOutExpo');
                    event.preventDefault();
                });
            });
            /*====================================
            VAGAS SLIDESHOW SCRIPTS
            ======================================*/
            $(function () {
                /*$.vegas('slideshow', {
                    backgrounds: [
                      { src: 'assets/img/1.jpg', fade: 1000, delay: 9000 },
                      { src: 'assets/img/2.jpg', fade: 1000, delay: 9000 },


                    ]
                })('overlay', {
                    /!** SLIDESHOW OVERLAY IMAGE **!/
                    src: 'assets/plugins/vegas/overlays/03.png' // THERE ARE TOTAL 01 TO 15 .png IMAGES AT THE PATH GIVEN, WHICH YOU CAN USE HERE
                });*/

            });



            /*====================================
               WRITE YOUR SCRIPTS BELOW
           ======================================*/





        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.main_fun();
    });

}(jQuery));
$(document).on("#carousel-slider",function(){
    $("img").on("swipeleft",function(){
        $('#carousel-slider').Carousel.prototype.next
    });
});
$('.nav li').on('click',function(){
    $('.nav li').removeClass('act');
    $(this).addClass('act');

});
$('.alert-close').click(function(){
    $('.alert-show').hide();
});
var click = window.location.href.match(/#.*/);
if(click !== null){
  click = click[0].match(/[a-z].*/)[0];
  console.log(click);
  $('.li'+click).addClass('act');
}
$('.alert-img').click(function(){
    var img = $(this).attr("data-href");
    console.log(img);
    $("#img-con").html('<img src="'+img+'">');
    $("#show-img").show();
});
$('.img-close').click(function(){
    $("#img-con").html('');
    $("#show-img").hide();
});
