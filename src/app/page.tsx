"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AvatarGenerator from "@/components/AvatarGenerator";
import StyleShowcase from "@/components/StyleShowcase";
import PresetPrompts from "@/components/PresetPrompts";
import Footer from "@/components/Footer";
import { AvatarStyleId } from "@/lib/constants";

export default function Home() {
  const [generatorKey, setGeneratorKey] = useState(0);
  const [initialPrompt, setInitialPrompt] = useState("");
  const [initialStyle, setInitialStyle] = useState<AvatarStyleId>("realistic");
  const [initialBackground, setInitialBackground] = useState("studio");

  const handlePresetSelect = useCallback((prompt: string, styleId: AvatarStyleId, backgroundId: string) => {
    setInitialPrompt(prompt);
    setInitialStyle(styleId);
    setInitialBackground(backgroundId);
    setGeneratorKey((k) => k + 1);

    // Scroll to generator
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <Hero />
      <AvatarGenerator
        key={generatorKey}
        initialPrompt={initialPrompt}
        initialStyle={initialStyle}
        initialBackground={initialBackground}
      />
      <StyleShowcase />
      <PresetPrompts onSelect={handlePresetSelect} />
      <Footer />
    </main>
  );
}
