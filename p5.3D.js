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
//(function() {
// =============================================================================
//                         p5.3D
// =============================================================================

p5.prototype.Object3D = function(depth, size, resolution, bevelled) {
	this.depth = depth; // Depth in the z axis
	this.size = size; // Size that each "pixel" (cube) is
	this.resX = resolution; // Number of cubes per character (higher is more detailed)
	this.resY = resolution;
	this.bevelled = bevelled;

	this.width = 0;

	this.toArray = function(graphic) {
		var array = []
		// Put all of the non-white pixels in an array as 1s
		graphic.loadPixels()
		for (var x = 0; x < graphic.width; x++) {
			array.push([]);
			for (var y = 0; y < graphic.height; y++) {
				if (graphic.get(x, y)[0] != 255) {
					array[x].push(1);
					this.edges[0] = x < this.edges[0] ? x : this.edges[0];
					this.edges[1] = x > this.edges[1] ? x : this.edges[1];
				} else {
					array[x].push(0);
				}
			}
		}

		// Constrain is needed for characters like "space" that otherwise have a negative width
		this.width = constrain(Math.abs(this.edges[1] - this.edges[0] + 4), 10, this.resX * 1.1);

		return array;
	}

	this.array = this.toArray(this.create());
	this.rects = getRects(this.array, this.bevelled);

	this.modX = function() {
		return this.resX / 2
	}

	this.modY = function() {
		return this.resY / 2
	}

	this.show = function() {
		push();
		for (var Rect of this.rects) {
			var w = Rect.x2 - Rect.x1 + 1;
			var h = Rect.y2 - Rect.y1 + 1;
			var xPos = Rect.x1 + w / 2;
			var yPos = Rect.y1 + h / 2;

			push();

			translate((xPos - this.modX()) * this.size, (yPos - this.modY()) * this.size, 0);
			box(w * this.size, h * this.size, this.depth * this.size * Rect.b);

			pop();
		};
		pop();
	};
}


p5.prototype.Letter3D = function(letter, depth, size, resolution, bevelled = true, font = "Georgia", style = BOLD) {
	call p5.prototype.Object3D(this, depth, size, resolution, bevelled)
	this.font = font;
	this.style = style;

	this.create = function() {
		// Create the 2D graphic
		var graphic = createGraphics(this.resX, this.resY);

		// Draw the given character in the centre
		graphic.textAlign(CENTER, CENTER);
		graphic.textSize(this.resX * 6 / 5);
		graphic.textFont(font);
		graphic.textStyle(style);
		graphic.background(255);
		graphic.text(this.letter, graphic.width / 2, graphic.height / 2);

		return graphic
	}

	this.modX = function() {
		return this.edges[0]
	}
};

// Adding Letter3D as a child of Object3D
p5.prototype.Letter3D.prototype = Object.create(p5.prototype.Object3D.prototype);

p5.prototype.Word3D = function(string, depth, size, resolution, bevelled = true, font = "Georgia", style = BOLD) {
	call p5.prototype.Letter3D(this, string[0] size, resolution, bevelled, font, style)
	this.string = string;

	this.create = function() {
		var array = [];
		this.width = 0;
		for (var i = 0; i < string.length; i++) {
			var temp = new Letter3D(
				string[i], this.depth, this.size, this.res, this.bevelled, this.font, this.style
			);
			this.width += temp.width;
			array.push(temp);
		}
		this.letters = array;
	}

	this.create();

	this.setText = function(string) {
		this.string = string;
		this.create();
	}

	this.show = function() {
		push();
		translate(-this.width * this.size * 0.5, 0, 0); // Centre the word
		for (var letter of this.letters) {
			letter.show();
			translate((letter.width) * this.size, 0, 0); // Kerning to make sure that each letter is close to one another
		}
		pop();
	}
}

// Adding Word3D as a child of Letter3D
p5.prototype.Word3D.prototype = Object.create(p5.prototype.Letter3D.prototype);


p5.prototype.Picture3D = function(picture, depth, size, resolution, bevelled = false) {
	call p5.prototype.Object3D(this, depth, size, resolution, bevelled)
	this.picture = picture; // Letter

	this.create = function() {
		// Create the 2D graphic
		var graphic = createGraphics(this.resX, this.resY);

		// Draw the given picture in the corner
		graphic.background(255, 255, 255, 255);
		graphic.image(this.picture, -1, -1, this.resX, this.resY);

		return graphic;
	}
}

// Adding Picture3D as a child of Object3D
p5.prototype.Picture3D.prototype = Object.create(p5.prototype.Object3D.prototype);


p5.prototype.Drawing3D = function(canvas, renderer, depth, size, resolution, bevelled = false) {
	call p5.prototype.Object3D(this, depth, size, resolution, bevelled)

	this.create = function() {
		return this.drawing;
	}
}

// Adding Drawing3D as a child of Object3D
p5.prototype.Drawing3D.prototype = Object.create(p5.prototype.Object3D.prototype);

//
