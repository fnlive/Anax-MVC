$(document).ready(function(){

    $('a.lightbox').each(function() {
        console.log('into .lightbox...');
        $(this).fnbox();
    });
      console.log('Everything is ready.');

});
