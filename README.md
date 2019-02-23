# p5.3D
A library extending the functionality of WebGL allowing users to easily create 3D objects.

There are currently 4 differnt 3D objects available:
 - Letter3D
 - Word3D
 - Picture3D
 - Drawing3D

All of these work by generating a canvas using "createGraphics()", and passing that into the Object3D class. This then converts that into an array of 1s and 0s (where black or dark gray pixels are 1s, everything else a 0), onto which a number of rectangles are mapped to minimize the number of primitives needing to be drawn.

# Letter3D





Does what it says on the tin, Letter3D renders a letter in 3D. 

It's called as:
```javascript
letterObject = Letter3D(
  letter,          // The actual character that you want to draw (anything that can be passed into "text()"  
  depth,           // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
  size,            // The size of a unit "box()" making up part of the letter  
  resolution,      // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)  
  bevelled,        // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
  font,            // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
  style,           // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
)
  

```
