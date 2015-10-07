$(document).ready(function() {

    $("#size").change(function() {
        $('.changeMe').css("font-size", $(this).val() + "px");
    });   
});