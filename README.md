# 🛡️ Femora - AI-Powered Emergency Safety Web App

Femora is a **lightweight safety web application** designed to empower individuals during emergencies using AI-driven features like voice activation, automatic location tracking, gesture-based interaction, and discreet media capture. With simulated fake calls and real-time support, Femora ensures you're never alone in moments of distress.

---

## 🚀 Features

- 🎙️ **Voice Activation (ML)** – Triggers emergency mode using safe keywords like "Help" or "Emergency".
- 📍 **Live Location Tracking** – Fetches user's geolocation and displays nearby city/state.
- 🎥 **Camera Access** – Captures and stores a snapshot during emergency mode.
- 🎧 **Audio Recording** – Records audio clips and stores them locally for quick access.
- 📞 **Fake Call Simulation** – Simulates an incoming call to escape dangerous situations.
- 🧠 **Real-time ML Integration** – Voice & gesture triggers for intuitive and rapid response.
- 💬 **AI Speech Feedback** – Reassuring bot voice speaks calming emergency support.
- 📊 **Dashboard Data Sync** – Captured data (audio, photo, location) integrated to `dashboard_data.html`.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Media Access:** WebRTC APIs for Camera and Audio
- **Speech Processing:** Web Speech API (Speech Recognition + Speech Synthesis)
- **Geolocation API:** BigDataCloud Reverse Geocoding
- **Machine Learning:** Keyword detection (basic ML triggers)
- **Data Sync:** LocalStorage for client-side data caching

---

## 🧪 How It Works

1. On load, the app:
   - Retrieves user location
   - Starts camera feed & captures a snapshot
   - Records a 10-second audio
   - Triggers a calm emergency message via bot voice
2. Emergency mode can also be triggered via voice keyword
3. Data (image, audio, location) gets stored and can be displayed in a dashboard view.

---

## 📱 Future Scope

- 📲 **Mobile App Deployment** – Native Android/iOS version with extended APIs
- 🧠 **Advanced Emotion Recognition** – Detect stress via facial expression & voice tone
- 🛡️ **Real-Time Threat Detection** – Object & person detection using AI models
- ☁️ **Cloud Integration** – Store snapshots/audio securely for real-time access
- 🌐 **Multi-language & Accent Support** – Include support for Telugu, Hindi, and more

---

