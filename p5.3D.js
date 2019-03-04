/* p5.3D.js v0.0.1 2019-02-22 */
/**
 * @module p5.3D
 * @submodule p5.3D
 * @for p5.3D
 * @main
 */
/**
 *  p5.3D
 *  Freddie Rawlins
 *  The MIT License (MIT).
 *
 *  https://github.com/FreddieRa/p5.3D
 *
 *
 */
// =============================================================================
//                         p5.3D
// =============================================================================

p5.prototype.Object3D = function(depth, size, resolution, bevelled, threshold) {
    this.depth = depth; // Depth in the z axis
    this.size = size; // Size that each "pixel" (cube) is
    this.resX = resolution; // Size of graphic on which it's rendered (x-axis)
    this.resY = resolution; // Size of graphic on which it's rendered (y-axis)
    this.bevelled = bevelled; // Whether or not it has the inner emboss for 3D
    this.threshold = threshold; // Lightest grey accepted as pixel

    this.edges = [this.resX, 0] // Index of left and right-most pixel
    this.width = 0; // Total width of actual result (not including white pixels)

    this.toArray = function(graphic, mod = 0) {
        var array = [];
        graphic.loadPixels();
        // Put all of the non-white pixels in an array as 1s
        // Mod needed for images otherwise they get a trailing line of pixels
        for (var x = 0; x < graphic.width - mod; x++) {
            array.push([]);
            for (var y = 0; y < graphic.height - mod; y++) {
                if (graphic.get(x, y)[0] <= this.threshold) {
                    array[x].push(1);
                    // Update edges
                    this.edges[0] = x < this.edges[0] ? x : this.edges[0];
                    this.edges[1] = x > this.edges[1] ? x : this.edges[1];
                } else {
                    array[x].push(0);
                }
            }
        }

        return array;
    }

    // modX, modY, and modZ are needed so implementations can customise how
    // they're displayed, or add effects

    this.modX = function(Rect) {
        return (this.resX / 2);
    }

    this.modY = function(Rect) {
        return (this.resY / 2);
    }
	
    this.modZ = function(Rect) {
	return (0);
    }

    // this.rects doesn't exist in the base implementation, it's created by
    // the child class (this means that something cannot be a pure Object3D)
    this.show = function() {
        push();
        for (var Rect of this.rects) {
            var w = Rect.x2 - Rect.x1 + 1;
            var h = Rect.y2 - Rect.y1 + 1;
            var xPos = Rect.x1 + w / 2 - this.modX(Rect);
            var yPos = Rect.y1 + h / 2 - this.modY(Rect);
	    var zPos = - this.modZ(Rect);

            push();

            translate(xPos * this.size, yPos * this.size, zPos * this.size);
            // Rect.b here is either 1 or 1.5, depending on whether bevelled is true
            box(w * this.size, h * this.size, this.depth * this.size * Rect.b);
            pop();
        }
        pop();
    }
};


p5.prototype.Word3D = function(string, depth, size, resolution, bevelled = true, font = "Times New Roman", style = BOLD) {
	// Adds spaces for kerning
	this.string = string.split("").join(String.fromCharCode(8202));
	this.stringLength = string.length;
	this.font = font;
	this.style = style;
	this.threshold = 160; // Magic number, works well for text

	this.create = function() {
		// Create the 2D graphic
		var graphic = createGraphics(this.resX*this.stringLength, this.resY);
		// Draw the given string in the centre
		graphic.textAlign(CENTER, CENTER);
		graphic.textSize(this.resX);
		graphic.textFont(font);
		graphic.textStyle(style);
		graphic.background(255);
		graphic.text(this.string, graphic.width / 2, graphic.height / 2);

		return graphic;
	}

	p5.prototype.Object3D.call(this, depth, size, resolution, bevelled, this.threshold);
	this.array = this.toArray(this.create());
	this.rects = p5.prototype.getRects(this.array, this.bevelled);

	this.modX = function() {
		return (this.resX*this.stringLength / 2)
	}
};


p5.prototype.Picture3D = function(picture, depth, size, resolution, bevelled = false) {
    this.picture = picture; // Letter
    this.threshold = 60; // Magic number good for images

    this.create = function() {
        // Create the 2D graphic
        var graphic = createGraphics(this.resX, this.resY);

        // Draw the given picture in the corner
        graphic.background(255, 255, 255, 255);
        graphic.image(this.picture, -1, -1, this.resX, this.resY);

        return graphic;
    }

    p5.prototype.Object3D.call(this, depth, size, resolution, bevelled, this.threshold);

    // Redefine the resolution as a scaling of the width and height
    this.resX = int(this.picture.width*resolution);
    this.resY = int(this.picture.height*resolution);

    // Create the array using its own "create()" and Object3D's "toArray()"
    this.array = this.toArray(this.create(), 1);
    this.rects = p5.prototype.getRects(this.array, this.bevelled);
}


p5.prototype.Canvas3D = function(canvas, depth, size, resolution, bevelled = false) {
    this.canvas = canvas;
    this.threshold = 60; // Magic number good for canvases

    this.create = function() {
        return this.canvas;
    }

    p5.prototype.Object3D.call(this, depth, size, resolution, bevelled, this.threshold);

    // Redefine the resolution as a scaling of the width and height
    this.resX = this.canvas.width*resolution;
    this.resY = this.canvas.height*resolution;

    // Create the array using its own "create()" and Object3D's "toArray()"
    this.array = this.toArray(this.create());
    this.rects = p5.prototype.getRects(this.array, this.bevelled);
}


p5.prototype.getRects = function(array, bevel) {
    var mat = array;

    // Creates a 2D array filled with 0s the same dimensions as the passed
    // in array
    var inner = Array(mat.length).fill(0).map(x => Array(mat.length).fill(0));
    var rects = [];

    if (bevel) {
        for (var x = 0; x < mat.length; x++) {
            for (var y = 0; y < mat.length; y++) {
                // Makes sure it isn't on any of the edges since that would
                // cause the next check to break
                var notEdge = (x > 0 &&
                               y > 0 &&
                               x < (mat.length - 1) &&
                               y < (mat.length - 1)
                              );

                // Checks to see if it has pixels on every side
                var surrounded = (notEdge &&
                                  mat[x - 1][y] &&
                                  mat[x + 1][y] &&
                                  mat[x][y - 1] &&
                                  mat[x][y + 1]
                                );

                if (surrounded) {
                    inner[x][y] = 1;
                }
            }
        }
        for (var item of getRects1(inner)) {
            // This is used later to make the inner ones even thicker
            // to give the bevelled look
            item.b = 1.5;
            rects.push(item);
        }
    }
    for (var item of getRects1(array)) {
        item.b = 1;
        rects.push(item);
    }

    return rects;
}

function getRects1(array) {
    // Coordinates are done as (x,y) but actually indexing an array like
    // this is [y][x], so the array is transposed
    var mat = array[0].map((col, i) => array.map(row => row[i]));
    var index = 0;

    const W = mat[0].length;
    const H = mat.length;

    // get the area covered by rectangles
    let totalRectArea = 0;
    for (let i = 0; i < W; ++i) {
        for (let j = 0; j < H; ++j) {
            totalRectArea += mat[j][i] > 0 ? 1 : 0;
        }
    }

    const rects = [];
    let rectArea = 0;

    // find all rectangle until their area matches the total
    while (rectArea < totalRectArea) {
        const rect = findNextRect(index);
	index ++;
        rects.push(rect);
        markRect(rect);
        rectArea += (rect.x2 - rect.x1 + 1) * (rect.y2 - rect.y1 + 1);
    }

    function findNextRect(indexNum) {
        // find top left corner
        let foundCorner = false;
        const rect = {
            x1: 0,
            x2: W - 1,
            y1: 0,
            y2: H - 1,
	    number: indexNum,       // Used to enable individual control
        };
        for (let i = 0; i < W; ++i) {
            for (let j = 0; j < H; ++j) {
                if (mat[j][i] === 1) {
                    rect.x1 = i;
                    rect.y1 = j;
                    foundCorner = true;
                    break;
                }
            }
            if (foundCorner) break;
        }
        // find bottom right corner
        for (let i = rect.x1; i <= rect.x2; ++i) {
            if (mat[rect.y1][i] !== 1) {
                rect.x2 = i - 1;
                return rect;
            }
            for (let j = rect.y1; j <= rect.y2; ++j) {
                if (mat[j][i] !== 1) {
                    rect.y2 = j - 1;
                    break;
                }
            }
        }
        return rect;
    }

    // mark rectangle so won't be counted again
    function markRect({
        x1,
        y1,
        x2,
        y2
    }) {
        for (let i = x1; i <= x2; ++i) {
            for (let j = y1; j <= y2; ++j) {
                mat[j][i] = 2;
            }
        }
    }
    return rects;
};


//
//
