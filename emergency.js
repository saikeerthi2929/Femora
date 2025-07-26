const statusLocation = document.getElementById('status-location');
const statusCamera = document.getElementById('status-camera');
const statusAudio = document.getElementById('status-audio');
const video = document.getElementById('cam');
const canvas = document.getElementById('snapshot');

// 1. Location Access
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await res.json();
        statusLocation.innerText = `📍 Location: ${data.city}, ${data.principalSubdivision}`;
        statusLocation.classList.add("completed");
      } catch {
        statusLocation.innerText = "⚠️ Location fetch failed.";
      }
    });
  } else {
    statusLocation.innerText = "❌ Geolocation not supported.";
  }
}

// 2. Camera Access
async function captureSnapshot() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    statusCamera.innerText = "🎥 Camera access granted";
    statusCamera.classList.add("completed");

    setTimeout(() => {
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      localStorage.setItem('emergencySnapshot', canvas.toDataURL("image/png"));
    }, 2000);
  } catch {
    statusCamera.innerText = "❌ Camera access denied";
  }
}

// 3. Audio Recording
async function recordAudio() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      localStorage.setItem('emergencyAudio', url);
      statusAudio.innerText = "🎙️ Audio recorded";
      statusAudio.classList.add("completed");
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 10000);
  } catch {
    statusAudio.innerText = "❌ Mic access denied";
  }
}

// 4. Text-to-Speech Bot
function speakBotMessage() {
  const msg = new SpeechSynthesisUtterance("You’ve You've reached the emergency helpline. Please stay calm help is on the way. Your location is being tracked for your safety. You are not alone. Stay on the line, speak only if it's safe to do so. We’re here with you and will stay with you until you're secure. You are strong, and we will get you the help you need immediately.");
  msg.rate = 1;
  msg.pitch = 1;
  msg.voice = speechSynthesis.getVoices()[0];
  speechSynthesis.speak(msg);
}

// 5. SOS Buttons (Dummy for Now)
function fakeCall() {
  alert("📱 Fake Call Triggered (Simulation)");
}

function sendTextAlert() {
  alert("📩 Text Alert Sent (Simulation)");
}

// 🔁 Run on Load
window.onload = () => {
  getLocation();
  captureSnapshot();
  recordAudio();
  speakBotMessage();
};
