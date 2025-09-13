"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const slides = [
  {
    img: "/cato2.png",
    subTitle: "WAN 2.2 Image generation",
    title: "WAN 2.2",
    desc: "Generate complex images with the brand new and powerful WAN 2.2 model.",
    btn: "Try WAN 2.2",
  },
  {
    img: "/caro3.png",
    title: "FLUX",
    subTitle: "FLUX.1 Krea",
    desc: "Making the weights to our FLUX.1 model open-source. Explore and generate.",
    btn: "Explore FLUX",
  },
  {
    img: "/caro4.png",
    title: "Open Source",
    subTitle: "Open Source Models",
    desc: "Access cutting-edge AI models, curated by Krea, for free.",
    btn: "Learn More",
  },
  {
    img: "/caro8.png",
    title: "AI Enhancer",
    subTitle: "AI Enhancer Source Models",
    desc: "Enhance and upscale your AI images with incredible detail.",
    btn: "Enhance Now",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const totalPages = slides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  // ✅ Detect screen size client-side
  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="relative">
      <div className="mt-15 w-full">
        {/* Slide container */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * (isLargeScreen ? 70 : 100)}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative mr-10 w-[100%] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg sm:w-[95%] md:w-[85%] lg:w-[65%]"
              >
                <Image
                  src={slide.img}
                  alt={slide.title}
                  width={1000}
                  height={1000}
                  className="h-[300px] w-full rounded-2xl object-cover sm:h-[400px] md:h-[450px]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between px-4 py-4 text-white sm:px-8 sm:py-6">
                  {/* Title in the middle */}
                  <div className="flex flex-1 items-center justify-center">
                    <h2 className="s text-center text-4xl font-bold drop-shadow-lg sm:text-3xl md:text-5xl lg:text-9xl">
                      {slide.title}
                    </h2>
                  </div>

                  {/* Description + button at bottom */}
                  <div className="flex flex-col items-start space-y-2 sm:space-y-3">
                    {slide.subTitle && (
                      <h4 className="text-base font-semibold sm:text-lg md:text-2xl">
                        {slide.subTitle}
                      </h4>
                    )}
                    <div className="flex w-full justify-between">
                      <p className="max-w-[14rem] text-xs text-gray-200 sm:max-w-[20rem] sm:text-sm md:text-base">
                        {slide.desc}
                      </p>
                      <button className="w-fit cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-semibold text-black transition-colors hover:bg-gray-200 sm:px-4 sm:py-2 sm:text-sm md:px-6 md:text-base">
                        {slide.btn}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="mt-3 mb-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 cursor-pointer rounded-full sm:h-2 sm:w-2 ${
              current === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Prev/Next controls */}
      <div className="absolute right-0 -bottom-10 flex space-x-3">
        <button
          onClick={prevSlide}
          className="cursor-pointer rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 sm:p-3"
        >
          <HiChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="cursor-pointer rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 sm:p-3"
        >
          <HiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
