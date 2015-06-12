"use strict";

/**
 *
 * Grid Constructor function
 *
 */
function Grid() {
    this.canvas;
    this.grid = [];
    this.grid__item_active;
    this.task = {};
    this.task["answer"] = [];
    this.task["image_difficulty"] = 1;
};


/**
 *
 * Main initializing method
 *
 */
Grid.prototype.init = function () {

    this.init_zoom();
    this.create_grid(2, 2);
    this.activate_cell();


    $("#grid_size").on("change", $.proxy(this.change_grid, this));
    $("#difficulty").on("change", $.proxy(this.difficulty, this))
    $("#refresh").on("click", $.proxy(this.change_grid, this));
    $("#next-slide").on("click", $.proxy(this.next_slide, this));


}


/**
 *
 * For initializing the Zoom functionality
 *
 */
Grid.prototype.init_zoom = function () {
    $("#slide").elevateZoom({
        //scrollZoom : true,
        constrainType: "height",
        constrainSize: 274,
        cursor: "pointer",
        zoomWindowPosition: 1,
        zoomWindowOffetx: 10,
    });
}


/**
 *
 * For creating a grid overlayed over image
 *
 */
Grid.prototype.create_grid = function (rows, columns) {
    this.canvas = Raphael("canvas", $("#slide").width(), $("#slide").height());
    var gridHeight = $("#slide").height() / columns;
    var gridWidth = $("#slide").width() / rows;

    var x, y;
    for (y = 0; y < rows; y += 1) {
        for (x = 0; x < columns; x += 1) {

            var offsetH = y;
            var offsetW = x;
            var moveDown = (y + gridHeight - offsetH) * y;
            var moveRight = (x + gridWidth - offsetW) * x;

            var grid_item = this.canvas.rect(moveRight, moveDown, gridWidth, gridHeight)
                .attr({
                    "stroke": "#fff"
                }).animate()
            grid_item.node.setAttribute("class", "grid__item");


            grid_item["x"] = x;
            grid_item["y"] = y;
            grid_item["has_cancer"] = null;

            this.grid.push(grid_item);

        }
    }
}


Grid.prototype.activate_cell = function () {
    var delay = 200;
    var clicks = 0;
    var timer = null;
    var _this = this;

    $("body").on("click", ".zoomLens", function (evt) {

        evt.preventDefault();
        clicks++;  //count clicks

        this.grid__item_active = _this.loop();

        var grid__item_active = this.grid__item_active;
        var grid__item_node = this.grid__item_active.node;
        var grid__item_active_className = grid__item_node.className.animVal;


        if (clicks === 1) {
            timer = setTimeout(function () {

                if (grid__item_active_className != "grid__item grid__item--success") {
                    grid__item_node.setAttribute("class", "grid__item grid__item--success");
                    grid__item_active.has_cancer = true;
                } else {
                    grid__item_node.setAttribute("class", "grid__item");
                    grid__item_active.has_cancer = null;
                }          //after action performed, reset counter
                clicks = 0;
            }, delay);
        } else {
            clearTimeout(timer);    //prevent single-click action
            grid__item_node.setAttribute("class", "grid__item grid__item--error");
            grid__item_active.has_cancer = false;

            clicks = 0;
        }
    });
}


/**
 *
 * Loop through the grid items
 * and find the closest matching grid
 * that have the clicked coordinates
 *
 */
Grid.prototype.loop = function () {

    var _this = this;
    var active_node;


    var target = $(".zoomLens");
    var target_pos = {
        x: parseInt(target.css("left")),
        y: parseInt(target.css("top"))
    }

    // Center the zoom cursor to middle of square
    target_pos.x = target_pos.x + 30
    target_pos.y = target_pos.y + 30

    // Find the closet grid item
    $.each(this.grid, function (key, value) {

        if (value.isPointInside(target_pos.x, target_pos.y)) {
            active_node = value;
            _this.show_results(value);

        }
    });

    return active_node;

}

/**
 *
 * Add click listener to each grid cell
 *
 */
Grid.prototype.show_results = function (active_node) {
    $("#result-row").text(active_node.y);
    $("#result-column").text(active_node.x);
    $("#result-item").text(active_node.id + 1);
}


Grid.prototype.change_grid = function () {
    var str = "";

    $("#grid_size option:selected").each(function () {
        str = $(this).val();
    });
    console.log(str);


    this.grid = [];
    this.canvas.clear();
    $("svg").remove();
    this.create_grid(str, str);

    $.each(this.grid, function (key, value) {
        value.id = key;
    });

}

Grid.prototype.difficulty = function () {
    var a = "";
    $("#difficulty option:selected").each(function () {
        a = $(this).val();
    });
    console.log(a);
    this.task["image_difficulty"] = a;
}

Grid.prototype.next_slide = function () {
    var _this = this;
    $.each(this.grid, function (key, value) {
        var obj = {
            column: value.x,
            row: value.y,
            answer: value["has_cancer"]
        }
        _this.task["answer"].push(obj);
    });

    console.log(this.task);

}
