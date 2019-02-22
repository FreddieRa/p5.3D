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
function Letter3D(letter, depth, size, resolution, bevelled = true, font = "Georgia", style = BOLD) {
	this.letter = letter; // Letter
	this.depth = depth; // Depth in the z axis
	this.size = size; // Size that each "pixel" (cube) is
	this.res = resolution; // Number of cubes per character (higher is more detailed)
	this.bevelled = bevelled; // Outer two z-layers are smaller to give a 3D effect
	this.font = font;
	this.style = style;
	this.width = 0;


	this.create = function() {
		// Create the 2D graphic
		var test = createGraphics(this.res, this.res);
		var array = [];

		// Draw the given character in the centre
		test.textAlign(CENTER, CENTER);
		test.textSize(this.res * 6 / 5)
		test.textFont(font);
		test.textStyle(style);
		test.background(255);
		test.text(this.letter, test.width / 2, test.height / 2);
		this.edges = [this.res, 0]


		// Put all of the non-white pixels in an array as 1s
		test.loadPixels()
		for (var x = 0; x < test.width; x++) {
			array.push([]);
			for (var y = 0; y < test.height; y++) {
				if (test.get(x, y)[0] != 255) {
					array[x].push(1);
					this.edges[0] = x < this.edges[0] ? x : this.edges[0];
					this.edges[1] = x > this.edges[1] ? x : this.edges[1];
				} else {
					array[x].push(0);
				}
			}
		}

		// Constrain is needed for characters like "space" that otherwise have a negative width
		this.width = constrain(this.edges[1] - this.edges[0] + 4, 18, 34)


		return array;
	}

	this.array = this.create();
	this.rects = getRects(this.array, this.bevelled);

	this.show = function() {
		push()
		for (var Rect of this.rects) {
			var w = Rect.x2 - Rect.x1 + 1;
			var h = Rect.y2 - Rect.y1 + 1;
			var xPos = Rect.x1 + w / 2;
			var yPos = Rect.y1 + h / 2;

			push();

			translate((xPos - this.edges[0]) * this.size, (yPos - this.res / 2) * this.size, 0);
			box(w * this.size, h * this.size, this.depth * this.size * Rect.b);

			pop();

		}
		pop()
	}

}


function Word3D(string, depth, size, resolution, bevelled = true, font = "Georgia", style = BOLD) {
	this.string = string;
	this.depth = depth;
	this.size = size;
	this.res = resolution;
	this.bevelled = bevelled;
	this.font = font;
	this.style = style;

	this.create = function() {
		var array = [];
		this.width = 0;
		for (var i = 0; i < string.length; i++) {
			var temp = new Letter3D(
				string[i], this.depth, this.size, this.res, this.bevelled, this.font, this.style
			)
			this.width += temp.width
			array.push(temp)
		}
		this.letters = array;
	}

	this.create()

	this.setText = function(string) {
		this.string = string;
		this.create()
	}

	this.show = function() {
		push()
		translate(-this.width * this.size * 0.5, 0, 0) // Centre the word
		for (var letter of this.letters) {
			letter.show()
			translate((letter.width) * this.size, 0, 0) // Kerning to make sure that each letter is close to one another
		}
		pop()
	}
}

function Picture3D(picture, depth, size, resScale, bevelled = false) {
	this.picture = picture; // Letter
	this.depth = depth; // Depth in the z axis
	this.size = size; // Size that each "pixel" (cube) is
	this.resX = int(this.picture.width*resScale);
	this.resY = int(this.picture.height*resScale);
	this.bevelled = bevelled;


	this.create = function() {
		// Create the 2D graphic
		var test = createGraphics(this.resX, this.resY);
		var array = [];

		// Draw the given picture in the corner
		test.background(255,255,255,255);
		test.image(this.picture, -1, -1, this.resX, this.resY);


		// Put all of the non-white pixels in an array as 1s
		test.loadPixels()
		for (var x = 0; x < test.width-1; x++) {
			array.push([]);
			for (var y = 0; y < test.height-1; y++) {
				if (test.get(x, y)[0] <= 60) {
					array[x].push(1);
				} else {
					array[x].push(0);
				}
			}
		}

		//for(var arr of array){print(arr)}
		return array;
	}

	this.array = this.create();
	this.rects = getRects(this.array, this.bevelled);

	this.show = function() {
		for (var Rect of this.rects) {
			var w = Rect.x2 - Rect.x1 + 1;
			var h = Rect.y2 - Rect.y1 + 1;
			var xPos = Rect.x1 + w / 2;
			var yPos = Rect.y1 + h / 2;

			push();

			translate((xPos - this.resX / 2) * this.size, (yPos - this.resY / 2) * this.size, 0);
			box(w * this.size, h * this.size, this.depth * this.size * Rect.b);

			pop();

		}
	}
}

function Drawing3D(canvas, renderer, depth, size, resScale, bevelled = false) {
	this.drawing = canvas; // Letter
	this.depth = depth; // Depth in the z axis
	this.size = size; // Size that each "pixel" (cube) is
	this.resX = int(this.drawing.width*resScale);
	this.resY = int(this.drawing.height*resScale);
	this.bevelled = bevelled;


	this.create = function() {
		// Create the 2D graphic
		var test = this.drawing;
		var array = [];

		// Put all of the non-white pixels in an array as 1s
		test.loadPixels()
		for (var x = 0; x < test.width-5; x++) {
			array.push([]);
			for (var y = 0; y < test.height-1; y++) {
				if (test.get(x, y)[0] <= 60) {
					array[x].push(1);
				} else {
					array[x].push(0);
				}
			}
		}

		//for(var arr of array){print(arr)}
		return array;
	}

	this.array = this.create();
	this.rects = getRects(this.array, this.bevelled);

	this.show = function() {
		renderer.translate(-renderer.width*1.8, -renderer.height*1.8)
		for (var Rect of this.rects) {
			var w = Rect.x2 - Rect.x1 + 1;
			var h = Rect.y2 - Rect.y1 + 1;
			var xPos = Rect.x1 + w / 2;
			var yPos = Rect.y1 + h / 2;

			renderer.push();

			renderer.translate((xPos - this.resX) * this.size, (yPos - this.resY) * this.size, 0);
			renderer.box(w * this.size, h * this.size, this.depth * this.size * Rect.b);

			renderer.pop();

		}
	}
}

function getRects(array, bevel) {
	var mat = array
	var inner = Array(mat.length).fill(0).map(x => Array(mat.length).fill(0));
	var rects = []

	if (bevel) {
		for (var x = 0; x < mat.length; x++) {
			for (var y = 0; y < mat.length; y++) {
				var notEdge = (x > 0 && y > 0 && x <  (mat.length - 1) && y <  (mat.length - 1));
				var surrounded = (notEdge && mat[x - 1][y] && mat[x + 1][y] && mat[x][y - 1] && mat[x][y + 1]);
				if(surrounded){inner[x][y] = 1;}
			}
		}
		for(var item of getRects1(inner)){
			item.b = 1.5;
			rects.push(item)
		}
	}
	for(var item of getRects1(array)){
		item.b = 1;
		rects.push(item)
	}

	return rects
}

function getRects1(array) {
	var mat = array[0].map((col, i) => array.map(row => row[i]));


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
		const rect = findNextRect();
		rects.push(rect);
		markRect(rect);
		rectArea += (rect.x2 - rect.x1 + 1) * (rect.y2 - rect.y1 + 1);
	}

	//console.log(rects);

	function findNextRect() {
		// find top left corner
		let foundCorner = false;
		const rect = {
			x1: 0,
			x2: W - 1,
			y1: 0,
			y2: H - 1
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
	function markRect({x1,y1,x2,y2}) {
		for (let i = x1; i <= x2; ++i) {
			for (let j = y1; j <= y2; ++j) {
				mat[j][i] = 2;
			}
		}
	}
	return rects
}
