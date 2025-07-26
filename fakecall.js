// File: scripts/fakecall.js

const ringtone = document.getElementById('ringtone');

function acceptCall() {
  ringtone.pause();
  alert("Call Accepted. You can talk now.");
}

function rejectCall() {
  ringtone.pause();
  alert("Call Rejected.");
  window.location.href = "dashboard.html";
}
