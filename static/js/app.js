"use strict";


/*
 * App.js
 */


function runApp(task) {

    /* Init example cells carousel */

    $('.example-list').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToScroll: 5,
        slidesToShow: 5
    });




    var z = new Zoom(),
        r = new Grid(task),
        m = new Modal();

    r.createGrid();


    var selectBtn = document.getElementById("selectAllBtn");
    selectBtn.onclick = function() {
        r.selectAllSquares();
    }
    var deselectBtn = document.getElementById("deselectBtn");
    deselectBtn.onclick = function() {
        r.deselectAllSquares();
    }



    /* Launch tutorial modal */

    var openModalCount = 0;
    var modalBtn = document.getElementById("modalShow");
    modalBtn.onclick = function() {
        m.open();
        z.removeZoom($(".tutorialZoom"));
        openModalCount++;
    };

    $(document).on("click", "#closeBtn, #goBackBtn", function(e) {
        z.removeZoom($(".tutorialZoom"));
        $("#errorClick").show();
        z.addZoom($(".img-polaroid"));
    });


    var nextBtn = document.getElementById("nextBtn");
        nextBtn.onclick = function () {
        m.showStep('next');
    };
    var prevBtn = document.getElementById("prevBtn");
    prevBtn.onclick = function () {
        m.showStep('prev');
    };






    /* Tooltips - not used yet */

    $('.grid-info-instructions').tooltip({
        selector: "a[data-toggle=tooltip]"
    });

    $('.example-list').tooltip({
        selector: "a[data-toggle=tooltip]"
    });




}
