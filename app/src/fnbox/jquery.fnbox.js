(function($) {
    // Shell for plugin code
    $.fn.fnbox = function() {
        // Plugin code
        function positionLightboxImage() {
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var windowRatio = windowHeight/windowWidth;
            var lbHeight = $('#lightbox').height();
            var lbWidth = $('#lightbox').width();
            var lbRatio = lbHeight/lbWidth;

            // Set size of LB image to fit inside window
            if (lbRatio > windowRatio) {
                // LB is constrained by height
                $('#lightbox img')
                .css({
                    'width': 1 / lbRatio * windowHeight - 20,
                    'height': windowHeight - 20
                });
            } else {
                // LB is constrained by width
                $('#lightbox img')
                .css({
                    'width': windowWidth - 20,
                    'height': lbRatio * windowWidth - 20
                });
            }

            // Set position of lightbox
            var top = ($(window).height() - $('#lightbox').height()) / 2;
            var left = ($(window).width() - $('#lightbox').width()) / 2;
            $('#lightbox')
            .css({
                // 'top': top + $(document).scrollTop(),
                'top': top + 0,
                'left': left
            })
            .fadeIn();
        }

        function removeLightbox() {
            $('#overlay, #lightbox')
            .fadeOut('slow', function() {
                $(this).remove();
                $('body').css('overflow-y', 'auto'); // show scrollbars!
            });
        }

        $(this).click(function() {
            // hide scrollbars!
            $('body').css('overflow-y', 'hidden');
            $('<div id="overlay"></div>')
            // .css('top', $(document).scrollTop())
            .css('opacity', '0')
            .animate({'opacity': '0.5'}, 'slow')
            .appendTo('body');
            $('<div id="lightbox"></div>')
            .hide()
            .appendTo('body');
            $('<img>')
            .attr('src', $(this).attr('href'))
            .load(function() {
                positionLightboxImage();
            })
            .click(function() {
                removeLightbox();
            })
            .appendTo('#lightbox');
            $('#overlay').click(function () {
                removeLightbox();
            });
            // Remove lightbox on press key esc
            $(document).bind('keydown', function (e) {
                if (e.which == 27) {
                    removeLightbox();
                }
            });
            return false;
        });

    };
})(jQuery);
