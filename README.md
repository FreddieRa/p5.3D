# p5.3D
A library extending the functionality of WebGL allowing users to easily create 3D objects.

![P5.3D](https://openprocessing-usercontent.s3.amazonaws.com/files/user113782/visual669863/hb22e8c75db748b34dda77dbf19996615/P53DImage.png)

There are currently 4 different 3D objects available:

 - [Letter3D](https://github.com/FreddieRa/p5.3D/wiki/Letter3D)
 - [Word3D](https://github.com/FreddieRa/p5.3D/wiki/Word3D)
 - [Picture3D](https://github.com/FreddieRa/p5.3D/wiki/Picture3D)
 - [Canvas3D](https://github.com/FreddieRa/p5.3D/wiki/Canvas3D)
 
 
All of these work by generating a canvas using "createGraphics()", and passing that into the Object3D class. This then converts that into an array of 1s and 0s (where black or dark gray pixels are 1s, everything else a 0), onto which a number of rectangles are mapped to minimize the number of primitives needing to be drawn.

Check out the [wiki](https://github.com/FreddieRa/p5.3D/wiki) to see how they work, or read my [article](https://www.openprocessing.org/sketch/674191) on OpenProcessing!
