// https://davidwalsh.name/browser-camera

// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

var range = document.getElementById('opacityRange');

range.addEventListener('change', () => {
  video.style.opacity = range.value;
});

var flipButton =  document.getElementById('flipButton');

flipButton.addEventListener('click', () => {
  if(video.style.transform) {
    video.style.transform = '';
  } else {    
    video.style.transform = 'rotate(180deg)';
  }
});
