import { Pause, Play, Stop } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";

const TextToSpeech = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null) as any;
  const [voice, setVoice] = useState(null) as any;
  const pitch = 1,
    rate = 1,
    volume = 1;

  useEffect(() => {
    const content = document.getElementById("content")?.innerText;
    // console.log(content)

    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(content) as any;
    setUtterance(u);

    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    synth.addEventListener("voiceschanged", () => {
      const voices = synth.getVoices();
      setVoice(voices[0]);
    });

    return () => {
      synth.cancel();
      synth.removeEventListener("voiceschanged", () => {
        setVoice(null);
      });
    };
  }, []);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    setIsPaused(true);
    synth.pause();
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    setIsPaused(false);
    synth.cancel();
  };

  const handleVoiceChange = (event: any) => {
    const voices = window.speechSynthesis.getVoices().slice(0, 5);
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className=" text-gray-500 p-2 rounded mt-2 mb-4 hover:text-black focus:text-black"
        title="Play/Pause"
        onClick={handlePlay}
      >
        <Play size={24} />
      </button>
      <button
        className=" text-gray-500 p-2 rounded mt-2 mb-4 hover:text-black focus:text-black"
        title="Pause"
        onClick={handlePause}
      >
        <Pause size={24} />
      </button>
      <button
        className=" text-gray-500 p-2 rounded mt-2 mb-4 hover:text-red-500 focus:text-red-500"
        title="Pause"
        onClick={handleStop}
      >
        <Stop size={24} />
      </button>
      <select
        value={voice?.name}
        onChange={handleVoiceChange}
        className="mb-2 text-xs text-white bg-gray-500 focus:outline-none w-1/3 rounded-md ml-3 p-1"
      >
        {window.speechSynthesis
          .getVoices()
          .slice(0, 5)
          .map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default TextToSpeech;
