"use client";

import { useState } from "react";
import { BsImage, BsMusicNoteBeamed } from "react-icons/bs";
import { HiVideoCamera } from "react-icons/hi";
import { FaEdit, FaBrain, FaMagic } from "react-icons/fa";
import { RiCpuLine } from "react-icons/ri";
import { TbSwitchHorizontal } from "react-icons/tb";
import { Tools } from "@/types/types";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const tools: Tools[] = [
  {
    icon: <BsImage size={30} className="text-white" />,
    title: "Image",
    description: "Generate images with custom styles in Flux and Ideogram.",
    action: "Open",
    bg: "bg-gradient-to-b from-gray-800 to-gray-500",
    isNew: true,
  },
  {
    icon: <FaEdit size={30} className="text-purple-600" />,
    title: "Edit",
    description: "Add objects, change style, or expand photos and generations.",
    action: "Open",
    bg: "bg-purple-100",
    isNew: true,
  },
  {
    icon: <HiVideoCamera size={30} className="text-green-600" />,
    title: "Video",
    description: "Generate videos with Haiper, Pika, Runway, Luma, and more.",
    action: "Open",
    bg: "bg-green-100",
  },
  {
    icon: <BsMusicNoteBeamed size={30} className="text-orange-600" />,
    title: "Video Lipsync",
    description: "Lip sync any video to any audio.",
    action: "Open",
    bg: "bg-orange-100",
    isNew: true,
  },
  {
    icon: <RiCpuLine size={30} className="text-sky-600" />,
    title: "Realtime",
    description: "Realtime AI rendering on a canvas. Instant feedback loops.",
    action: "Open",
    bg: "bg-sky-100",
  },
  {
    icon: <TbSwitchHorizontal size={30} className="text-rose-600" />,
    title: "Motion Transfer",
    description: "Transfer motion to images and animate characters.",
    action: "Open",
    bg: "bg-rose-100",
    isNew: true,
  },
  {
    icon: <FaMagic size={30} className="text-indigo-600" />,
    title: "Enhancer",
    description: "Upscale and enhance images and videos up to 22K.",
    action: "Open",
    bg: "bg-indigo-100",
    isNew: true,
  },
  {
    icon: <FaBrain size={30} className="text-gray-600" />,
    title: "Train",
    description: "Teach Krea to replicate your style, products, or characters.",
    action: "Open",
    bg: "bg-gray-200",
  },
];

export default function Generate() {
  const [showAll, setShowAll] = useState(false);

  const visibleTools = showAll ? tools : tools.slice(0, 4);

  return (
    <section className="py-10">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white">Generate</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex cursor-pointer items-center justify-center space-x-0.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <span>{showAll ? <HiChevronUp /> : <HiChevronDown />}</span>
          <span>{showAll ? " Show less " : " Show all "}</span>
        </button>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {visibleTools.map((tool, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-4 rounded-xl p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {/* First grid column (Icon and Text) */}
            <div className="flex items-center gap-3">
              <div
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg ${tool.bg}`}
              >
                {tool.icon}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="my-1 font-medium text-gray-900 dark:text-white">
                    {tool.title}
                  </h3>

                  {tool.isNew && (
                    <span className="rounded-2xl bg-blue-700 px-2 py-1 text-xs font-semibold text-white dark:bg-blue-900/50 dark:text-blue-300">
                      New
                    </span>
                  )}
                </div>
                <p className="max-w-[85%] text-sm text-gray-500 dark:text-gray-400">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Second grid column (Button) */}
            <button className="bg-primary-gray-200 flex-shrink-0 cursor-pointer rounded-2xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              {tool.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
