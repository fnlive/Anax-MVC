$(document).ready(function(){
      'use strict';

    //   var shopPath = 'http://localhost/javascript/me/kmom04/Anax-MVC/app/src/Webshop/shop.php';
      var shopPath = 'http://www.student.bth.se/~frnf15/dbwebb-kurser/javascript/me/kmom04/Anax-MVC/app/src/Webshop/shop.php';
    //   var shopPath ='http://localhost/BTH-KP201/dbwebb-kurser/javascript/me/kmom04/Anax-MVC/app/src/Webshop/shop.php'

      function updateCartView(data) {
          $('#shoppingcart-table').html(data.content);
          $('#shoppingcart-summary').html('<p>Items in cart: ' + data.numitems + '</br> Total is: ' + data.sum + '</p>');
      }

      // Update shopping cart view once on page load.
      $.ajax({
        type: 'post',
        url: shopPath,
        dataType: 'json',
        success: function (data) {
            updateCartView(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log('Ajax request failed: ' + textStatus + ', ' + errorThrown);
        },
    });

    /**
     * Eventhandler for add item
     */
    $('button.purchase').on('click', function() {
        console.log('Clicked Buy it. Book ', $(this).attr('id'));
        var item = $(this).attr('id');
        $.ajax({
          type: 'post',
        //   url: 'shop.php?action=add&itemid=' + item,
          url: shopPath + '?action=add&itemid=' + item,
          dataType: 'json',
          success: function (data) {
              console.log('.ajax() request "Buy it" returned successfully.');
              updateCartView(data);
          },
          error: function(jqXHR, textStatus, errorThrown){
            console.log('Ajax request failed: ' + textStatus + ', ' + errorThrown);
          },
        });
    });

    /**
     * Eventhandler for clear shoppingcart
     */
    $('button#clearcart').on('click', function() {
        console.log('Clicked Clear.');
        $.ajax({
          type: 'post',
          url: shopPath + '?action=clear',
          dataType: 'json',
          success: function (data) {
              console.log('.ajax() request "Clear" returned successfully.');
              updateCartView(data);
          },
          error: function(jqXHR, textStatus, errorThrown){
            console.log('Ajax request failed: ' + textStatus + ', ' + errorThrown);
          },
        });
    });


});
