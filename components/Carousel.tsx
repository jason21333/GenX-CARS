"use client";

import { useState } from "react";

type CarouselProps = {
  images: { src: string; alt: string }[];
  onOpen360: () => void;
};

export function Carousel({ images, onOpen360 }: CarouselProps) {
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const current = images[index];

  return (
    <section className="glass gradient-border rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Gallery</p>
            <h2 className="text-2xl font-semibold">Ferrai SF90 Stradale</h2>
          </div>
          <button
            onClick={onOpen360}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg hover:opacity-90 transition"
          >
            View 360°
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-slate-900">
          <img
            src={current.src}
            alt={current.alt}
            className="h-80 w-full object-cover md:h-[30rem] transition-transform duration-500"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute left-0 right-0 bottom-4 flex justify-between px-4 text-sm text-slate-200">
            <span>
              {index + 1}/{images.length}
            </span>
            <span>{current.alt}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm hover:border-accent hover:text-accent transition"
          >
            Prev
          </button>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-6 rounded-full transition ${
                  i === index ? "bg-accent" : "bg-slate-700"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm hover:border-accent hover:text-accent transition"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

