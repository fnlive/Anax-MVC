$(document).ready(function(){
    // Demo example for using jquery plugin fnbox
    console.log('Starting test_fnbox.js javascript.');
    $('a.lightbox').each(function() {
        $(this).fnbox();
    });
});
