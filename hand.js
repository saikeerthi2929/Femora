// File: scripts/hand.js

const video = document.getElementById('webcam');
const statusText = document.getElementById('hand-status');

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function detectHand() {
  const model = await handpose.load();
  statusText.innerText = "Model Loaded. Detecting Hand...";

  setInterval(async () => {
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
      const landmarks = predictions[0].landmarks;

      const fingerTips = [8, 12, 16, 20]; // Index to pinky
      let extendedFingers = 0;

      for (let i = 0; i < fingerTips.length; i++) {
        if (landmarks[fingerTips[i]][1] < landmarks[fingerTips[i] - 2][1]) {
          extendedFingers++;
        }
      }

      if (extendedFingers >= 4) {
        statusText.innerText = "Full Palm Detected! Triggering Emergency...";
        setTimeout(() => {
          window.location.href = "emergency.html";
        }, 1000);
      }
    } else {
      statusText.innerText = "No Hand Detected";
    }
  }, 1000);
}

setupCamera().then(detectHand);
