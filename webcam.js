// https://davidwalsh.name/browser-camera
const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const path = require('path')
const url = require('url')

var video = document.getElementById('video');
var cameraSelect = document.getElementById('cameraSelect');
var selectedId = null;

cameraSelect.addEventListener('change', () => {
  selectCamera(cameraSelect.value);
});

// https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js#L55
navigator
  .mediaDevices
  .enumerateDevices()
  .then(function(deviceInfos) {
    deviceInfos.forEach(device => {
      if(device.kind == 'videoinput') {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.textContent = device.label;
        cameraSelect.appendChild(option);
        if(!selectedId) {
          selectedId = device.deviceId;
          selectCamera(selectedId);
        }
      }
    });
  });

function selectCamera(deviceId) {
  navigator
    .mediaDevices
    .getUserMedia({
      video: {
        deviceId: {
          exact: deviceId
        },
        // https://webrtchacks.com/getusermedia-resolutions-3/
        width: {
          exact: 1280
        }
      }
    }).then(function(stream) {
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

var newCameraButton = document.getElementById('newCameraButton');

newCameraButton.addEventListener('click', () => {
  var win = new BrowserWindow({
    width: 1280,
    height: 720,
    alwaysOnTop: true,
    transparent: true,
    toolbar: false,
    frame: false
  });

  win.setAspectRatio(16/9);

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
});

var commentButton = document.getElementById('commentButton');

commentButton.addEventListener('click', () => {
  var chatWindow = new BrowserWindow({
    width: 300,
    height: 600,
    alwaysOnTop: true,
    transparent: true,
    frame: false
  });

  // and load the index.html of the app.
  chatWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'chat.html'),
    protocol: 'file:',
    slashes: true
  }));
});
