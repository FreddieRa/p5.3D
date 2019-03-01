# p5.3D
A library extending the functionality of WebGL allowing users to easily create 3D objects.

![P5.3D](https://user-images.githubusercontent.com/14854492/53637511-3efc0c80-3c1b-11e9-946c-7be4a2863d75.png)

There are currently 3 different 3D objects available:

 - [Word3D](https://github.com/FreddieRa/p5.3D/wiki/Word3D)
 - [Picture3D](https://github.com/FreddieRa/p5.3D/wiki/Picture3D)
 - [Canvas3D](https://github.com/FreddieRa/p5.3D/wiki/Canvas3D)
 
 
All of these work by generating a canvas using "createGraphics()", and passing that into the Object3D class. This then converts that into an array of 1s and 0s (where black or dark gray pixels are 1s, everything else a 0), onto which a number of rectangles are mapped to minimize the number of primitives needing to be drawn.

Check out the [wiki](https://github.com/FreddieRa/p5.3D/wiki) to see how they work, or read my [article](https://www.openprocessing.org/sketch/674191) on OpenProcessing!
