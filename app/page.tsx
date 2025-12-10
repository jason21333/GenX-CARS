 "use client";

import { useState } from "react";
import { Carousel } from "@/components/Carousel";
import { Overview } from "@/components/Overview";
import { PriceCalculator } from "@/components/PriceCalculator";
import { ThreeSixtyModal } from "@/components/ThreeSixtyModal";

const images = [
  { src: "/images/SF90.jpg", alt: "Ferrari SF90 front" },
  { src: "/images/SF91.jpg", alt: "Ferrari SF90 side" },
  { src: "/images/SF92.jpg", alt: "Ferrari SF90 rear" },
  { src: "/images/SF94.jpg", alt: "Ferrari SF90 front close-up" },
  { src: "/images/SF95.jpg", alt: "Ferrari SF90 rear three-quarter" },
  { src: "/images/SF96.jpg", alt: "Ferrari SF90 side three-quarter" }
];

const overviewStats = [
  { label: "Model", value: "Ferrari SF90 Stradale" },
  { label: "Year", value: "2020" },
  { label: "Price", value: "$524,815" },
  { label: "Mileage (MPG)", value: "38.6 MPG" },
  { label: "0-60 mph", value: "2.9 s" },
  { label: "Top Speed", value: "211 mph" },
  { label: "Power", value: "1000 hp" }
];

export default function HomePage() {
  const [open360, setOpen360] = useState(false);

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <header className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">GenX Cars</p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Interactive car experience with 360° view and live pricing
            </h1>
          </div>
          <a
            href="https://github.com/jason21333"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-accent hover:underline"
          >
            Developed by jason21333
          </a>
        </div>
        <p className="text-slate-300 max-w-3xl">
          Explore the car gallery, open a 360° interactive view
        </p>
      </header>

      <Carousel images={images} onOpen360={() => setOpen360(true)} />

      <PriceCalculator />

      <Overview
        title="Car Overview"
        description="Performance-focused electric platform tuned for long range touring and instant torque delivery. Built with advanced driver assistance, adaptive air suspension, and immersive cockpit technology."
        stats={overviewStats}
      />

      <ThreeSixtyModal open={open360} onClose={() => setOpen360(false)} />
    </div>
  );
}

