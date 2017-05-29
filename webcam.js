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

var flipVerticalButton =  document.getElementById('flipVerticalButton');
var flipHorizontalButton =  document.getElementById('flipHorizontalButton');

flipVerticalButton.addEventListener('click', () => {
  if(video.style.transform.includes('rotateX')) {
    video.style.transform = video.style.transform.replace('rotateX(180deg)', '');
  } else {
    video.style.transform += ' rotateX(180deg)';
  }
});

flipHorizontalButton.addEventListener('click', () => {
  if(video.style.transform.includes('rotateY')) {
    video.style.transform = video.style.transform.replace('rotateY(180deg)', '');
  } else {
    video.style.transform += ' rotateY(180deg)';
  }
});
