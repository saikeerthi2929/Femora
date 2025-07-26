// File: scripts/camera.js

let mediaRecorder;
let recordedChunks = [];

const videoElement = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    videoElement.srcObject = stream;

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    document.getElementById("status").innerText = "Recording...";

    mediaRecorder.ondataavailable = function(e) {
      recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = function() {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      localStorage.setItem('liveCameraVideo', url);
      document.getElementById("status").innerText = "Recording saved!";
    };
  })
  .catch(err => {
    alert("Failed to access camera.");
    document.getElementById("status").innerText = "Camera not available.";
  });

function stopRecording() {
  mediaRecorder.stop();
}
