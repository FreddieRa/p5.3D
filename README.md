# p5.3D
A library extending the functionality of WebGL allowing users to easily create 3D objects.

There are currently 4 differnt 3D objects available:
 - Letter3D
 - Word3D
 - Picture3D
 - Canvas3D

All of these work by generating a canvas using "createGraphics()", and passing that into the Object3D class. This then converts that into an array of 1s and 0s (where black or dark gray pixels are 1s, everything else a 0), onto which a number of rectangles are mapped to minimize the number of primitives needing to be drawn.

# Letter3D





Does what it says on the tin, Letter3D renders a letter in 3D. 

It's called as:
```javascript
letterObject = Letter3D(
  letter,          // The actual character that you want to draw (anything that can be passed into "text()")
  depth,           // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
  size,            // The size of a unit "box()" making up part of the letter  
  resolution,      // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)  
  bevelled,        // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
  font,            // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
  style            // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
)
```


# Word3D





A wrapper the creates a number of Letter3D objects, and displays them with proper kerning. Takes almost identical parameters to Letter3D since most of them are just passed straight into it.

It's called as:
```javascript
wordObject = word3D(
  string,       // The actual character that you want to draw (anything that can be passed into "text()")
  depth,        // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
  size,         // The size of a unit "box()" making up part of the letter  
  resolution,   // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)  
  bevelled,     // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
  font,         // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
  style         // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
)
```



# Picture3D





This takes a black and white p5.Image object (must be created in preload or else this will only render however much has been loaded at the time), and renders it in 3D.

It's called as:
```javascript
letterObject = Letter3D(
  picture,      // The p5.Image object created from "loadImage()"
  depth,        // How thick the 3D rendered image is (i.e. how many cube pixels of size "size" it is on z-axis)  
  size,         // The size of a unit "box()" making up part of the image  
  resolution,   // A scaling factor (0.1 scales the image by 0.1 to reduce detail, 1 is the full scale, 0.4 is a good default) 
  bevelled,     // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
)
```


# Canvas3D




The most general of all the functions, this doesn't create a graphic, it simply passes in an existing one. This means if you are currently creating a canvas to display something 2D as a texture in WebGL, you can instead pass that into Canvas3D and it will make a 3D object of it instead.

It's called as:
```javascript
canvasObject = Canvas3D(
  canvas,      // The p5.Graphics object
  depth,        // How thick the 3D rendered image is (i.e. how many cube pixels of size "size" it is on z-axis)  
  size,         // The size of a unit "box()" making up part of the image  
  resolution,   // A scaling factor (0.1 scales the canvas by 0.1 to reduce detail, 1 is the full scale, 0.4 is a good default) 
  bevelled,     // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
)
