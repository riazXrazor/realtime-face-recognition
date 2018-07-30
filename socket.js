const cv = require('opencv4nodejs');

if (!cv.xmodules.face) {
  throw new Error('exiting: opencv4nodejs compiled without face module');
}

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

// camera properties
var camWidth = 320;
var camHeight = 240;
var camFps = 10;
var camInterval = 1000 / camFps;

// initialize camera

var camera = new cv.VideoCapture(0);

module.exports = function (socket) {
  setInterval(function() {
    camera.readAsync(function(err, frame) {
      if (err) throw err;
      if(!frame) return;
      classifier.detectMultiScale(frame).objects.forEach((faceRect, i) => {
          
          cv.drawDetection(
            frame,
            faceRect,
            { color: new cv.Vec(255, 0, 0), segmentFraction: 4 }
          );
        
      });
     
            
      socket.emit('frame', { buffer: cv.imencode('.png',frame) });
    });


  }, camInterval);
};
