
window.onload = function (){

    // Function used to shrink nav bar removing paddings and adding black background
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.nav').addClass('affix');
            console.log("OK");
        } else {
            $('.nav').removeClass('affix');
        }
    });
}

