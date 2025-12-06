"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onResult: (text: string) => void;
};

export default function VoiceSearchButton({ onResult }: Props) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN"; // handles hi/mr/en decently for India
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, [onResult]);

  const handleClick = () => {
    if (!recognitionRef.current) {
      alert("Voice search not supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 text-xl transition-all duration-200 shadow-sm hover:shadow-md ${
        listening
          ? "bg-gradient-to-br from-red-500 to-red-600 text-white border-red-600 animate-pulse scale-110"
          : "bg-white text-emerald-700 border-emerald-500 hover:bg-emerald-50 hover:scale-105"
      }`}
      title="Voice search (Hindi/Marathi/English)"
    >
      🎙️
    </button>
  );
}
