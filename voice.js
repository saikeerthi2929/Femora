// File: scripts/voice.js

const statusSpan = document.getElementById('status');
const actionMsg = document.getElementById('action-msg');

let recognition;
let isRecording = false;
let mediaRecorder;
let recordedChunks = [];

function startListening() {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert("Speech Recognition not supported");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;

  recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log('Heard:', transcript);

    if (transcript.includes("help")) {
      statusSpan.innerText = "Detected 'help'";
      actionMsg.innerText = "Recording Started and Triggering Emergency Actions...";
      recognition.stop();
      startRecording();
    }
  };

  recognition.onerror = function (e) {
    statusSpan.innerText = "Error. Restarting...";
    startListening();
  };

  recognition.onend = function () {
    if (!isRecording) {
      statusSpan.innerText = "Restarting Listener...";
      startListening();
    }
  };

  recognition.start();
}

function startRecording() {
  isRecording = true;
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = function(e) {
        recordedChunks.push(e.data);
      };

      mediaRecorder.onstop = function() {
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        localStorage.setItem('voiceRecording', url);
        console.log("Recording saved to dashboard.");
      };

      // Automatically stop after 15 seconds
      setTimeout(() => {
        mediaRecorder.stop();
      }, 15000);
    });
}

startListening();
