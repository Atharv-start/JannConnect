import React, { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;

export default function VoiceFeatures() {
  const [transcript, setTranscript] = useState("");
  const [assistantReply, setAssistantReply] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Voice Search & Assistant
  const startVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setIsRecording(true);

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsRecording(false);

      // Simple assistant reply logic
      let reply = "Here are the results for " + text;
      setAssistantReply(reply);

      // Speak the reply
      const speech = new SpeechSynthesisUtterance(reply);
      window.speechSynthesis.speak(speech);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };
  };

  // Audio upload transcription
  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const response = await axios.post(
          "https://api.deepgram.com/v1/listen",
          reader.result,
          {
            headers: {
              Authorization: `Token ${API_KEY}`,
              "Content-Type": "audio/*",
            },
          }
        );

        const text =
          response.data.results.channels[0].alternatives[0].transcript;

        setTranscript(text);
      } catch (error) {
        console.error("Transcription error:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Voice Features</h2>

      <button
        onClick={startVoiceSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isRecording ? "Listening..." : "Start Voice Search"}
      </button>

      <div>
        <p className="font-semibold">Transcript:</p>
        <p>{transcript}</p>
      </div>

      <div>
        <p className="font-semibold">Assistant Reply:</p>
        <p>{assistantReply}</p>
      </div>

      <div>
        <p className="font-semibold">Upload Audio for Transcription:</p>
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      </div>
    </div>
  );
}
