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
      className={`ml-2 flex items-center justify-center w-10 h-10 rounded-full border text-lg ${
        listening
          ? "bg-emerald-600 text-white border-emerald-600"
          : "bg-white text-emerald-700 border-emerald-500"
      }`}
      title="Voice search (Hindi/Marathi/English)"
    >
      🎙️
    </button>
  );
}
