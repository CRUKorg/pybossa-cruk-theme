"use strict";

    /*
     * Modal
     *
     */


    function Modal() {
        this.step = -1;


    }

    Modal.prototype.open = function(){

        Grid.call(this);

        $('.modal').modal({
            backdrop: 'static',
            keyboard: false
        });
        this.showStep("next");


    }


    Modal.prototype = Object.create(Grid.prototype);



    Modal.prototype.showStep = function(action){

        var z = new Zoom();

       $("#" + this.step).hide();


        if (action == 'next') {
            this.step += 1;
        }
        if (action == 'prev') {
            this.step -= 1;
        }

        if (this.step == 14) {
            $('.zoomContainer').remove();
            $('.zoomWindowContainer').remove();
            $(".tutorialZoom14").elevateZoom();
        }

        var $currentStep = $("#" + this.step),
            $carousel = $("#" + this.step + " .carousel"),
            $modalInfo = $("#" + this.step + " .modal-info"),
            $items = $("#" + this.step + " .item");

        if ($carousel.length > 0) {

            $('.zoomContainer').remove();
            $('.zoomWindowContainer').remove();
            var tutorial = ".tutorialZoom" + this.step;

            $(tutorial).elevateZoom();

            if (!$carousel.data("carousel")) {

                $carousel.carousel({
                    interval: false
                });


                $($items).each(function (idx) {
                    // Adding buttons
                    var idx = idx + 1,
                        $item = $(this),
                        $li = '<div class="carousel-selector-' + idx + '" type="button">' + idx + '</div>';

                    $("#carouselIndicatorsList" + this.step).append($li);

                    //Adding item-info to modal-info
                    $(this).children(".item-inner");
                    $modalInfo.append($item.children(".item-inner"));
                });

                $("#" + this.step).find(".modal-info .item-inner").first().addClass("active");
                $("#" + this.step).find(".carousel-indicators-custom div").first().addClass("active");


                // When you click on each selector
                // Load new content
                $('[class^=carousel-selector-]').on('click', nextSlideContent($("#" + this.step)));
            }
        }


        if (this.step == 0) {
            $("#prevBtn").hide();
        } else {
            $("#prevBtn").show();
        }

        var $lastStep = $('.modal-body').length - 1
        if (this.step == $lastStep) {
            $("#nextBtn").hide();
            $("#goBackBtn").show();
        } else {
            $("#nextBtn").show();
            $("#goBackBtn").hide();
        }

        $("#" + this.step).show();
        console.log($("#" + this.step));

    }

    Modal.prototype.carousel = function(){


    }

    Modal.prototype.close = function(){


    }



