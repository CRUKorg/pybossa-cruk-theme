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










    /*
     *
     * Helpful functions
     *
     *
     */

    // Loads user progress into Grid info
    function loadUserProgress() {
        pybossa.userProgress('mvp-02').done(function (data) {
            var pct = Math.round((data.done * 100) / data.total);
            $("#progress").css("width", pct.toString() + "%");
            $("#progress").attr("title", pct.toString() + "% completed!");
            $("#progress").tooltip({
                'placement': 'bottom'
            });
            $("#total").text(data.total);
            $("#done").text(data.done);
        });
    }

    // uses device.js and works out what device we are using
    function whatDevice() {
        var desktop = device.desktop(),
            mobile = device.mobile(),
            tablet = device.tablet(),
            portrait = device.portrait(),
            landscape = device.landscape(),
            iphone = device.iphone(),
            android = device.android(),
            androidTablet = device.androidTablet(),
            blackberryTablet = device.blackberryTablet();


        if (desktop) return "Desktop";
        if (mobile && portrait)    return "Mobile portrait";
        if (mobile && portrait)    return "Mobile landscape";
        if (tablet && portrait)    return "Tablet portrait";
        if (tablet && landscape)    return "Tablet landscape";
    }

    // Using useragent we find what browser we are using
    function whatBrowser() {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null) return 'Opera ' + tem[1];
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }


    function nextSlideContent(carousel) {
        return function () {

            // Add and remove active class
            $(this).parent().children().removeClass("active");
            $(this).addClass("active");

            var id_selector = $(this).attr("class");
            var id = id_selector.substr(id_selector.length - 8);
            id = parseInt(id);
            var $itemInners = carousel.find(".modal-info .item-inner");
            $itemInners.removeClass('active');
            $($itemInners[id - 1]).addClass('active')
            var $modalId = $(this).parent().parent().parent().parent().attr("id");
            $('#myCarousel' + $modalId).carousel(id - 1);
        }
    }


    function secondsToString(seconds) {
        var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
        return numhours + ":" + numminutes + ":" + numseconds.toFixed(2);
    }


    /*
     *
     * End of helpful functions
     *
     * */

    /************************************************************************************/





}
