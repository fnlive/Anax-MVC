/**
 * Helpers and tools to ease your JavaScript day.
 *
 * @author Fredrik Nilsson (fn@live.se)
 */
window.Fnlive = (function(window, document, undefined ) {
    var Fnlive = {};


    /**
     * Pad integer with 1 leading zero.
     *
     * @param n
     */
    Fnlive.pad = function(n) {
        return (n < 10) ? ("0" + n) : n;
    };

    /**
     * Get a random integer.
     *
     * @param min, max, range of returned random integer.
     */
    Fnlive.random = function (min, max) {
        var myRandomNumber;
        myRandomNumber = Math.floor((Math.random() * max) + min);
        return parseInt(myRandomNumber.toFixed());
    };

    /**
     * Get the position of an element.
     * http://stackoverflow.com/questions/442404/dynamically-retrieve-html-element-x-y-position-with-javascript
     * @param el the element.
     */
    Fnlive.getOffset = function ( el ) {
        var _x = 0;
        var _y = 0;
        while ( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            console.log('Width: ' + el.offsetWidth);
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    };

    // Expose public methods
    return Fnlive;

})(window, window.document);
