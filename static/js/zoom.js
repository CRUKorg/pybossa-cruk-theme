
 "use strict";

    /*
     * Elevate Zoom
     *
     */

    function Zoom() {
        Grid.call(this);
    }

    Zoom.prototype = Object.create(Grid.prototype);

    Zoom.prototype.addZoom = function( element ){
        element.elevateZoom({
                    zoomWindowPosition: "grid-info",
                    lensFadeIn: 500,
                    lensFadeOut: 500,
                    zoomWindowWidth: 455,
                    zoomWindowHeight: 455,
                });
    }

    Zoom.prototype.removeZoom = function( element ){

        $.removeData( element , 'elevateZoom');
        $('.zoomContainer').remove();
        $('.zoomWindowContainer').remove();

    }
