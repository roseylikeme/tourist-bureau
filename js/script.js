window.onload = function (){

    // Function used to shrink nav bar removing paddings and adding black background
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.nav').addClass('affix');
        } else {
            $('.nav').removeClass('affix');
        }
    });
}

