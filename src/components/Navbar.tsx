"use client";

import { routesData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsBellFill, BsHeadset, BsImage } from "react-icons/bs";
import { FaAppStore, FaMoon } from "react-icons/fa";
import {
  HiChevronDown,
  HiFolder,
  HiHome,
  HiLightBulb,
  HiVideoCamera,
  HiBars3,
  HiMiniXMark,
} from "react-icons/hi2";
import { IoMdColorWand, IoMdConstruct } from "react-icons/io";

const LOCAL_KEY = "dark_mode";

function getInitialDarkMode(): boolean {
  try {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored !== null) return stored === "true";
    return document.documentElement.classList.contains("dark");
  } catch (error) {
    console.log("Could not access localStorage for dark mode:", error);
    return false;
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDarkMode(getInitialDarkMode());
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(LOCAL_KEY, String(darkMode));
  }, [darkMode]);

  const routes: routesData[] = [
    { id: 1, name: <HiHome />, label: "Home", path: "/" },
    { id: 2, name: <BsImage />, label: "Images", path: "#" },
    { id: 3, name: <HiVideoCamera />, label: "Videos", path: "#" },
    { id: 4, name: <IoMdColorWand />, label: "Magic", path: "#" },
    { id: 5, name: <IoMdConstruct />, label: "Tools", path: "#" },
    { id: 6, name: <FaAppStore />, label: "Apps", path: "#" },
    { id: 7, name: <HiFolder />, label: "Files", path: "#" },
  ];

  return (
    <nav className="mt-3 flex items-center justify-between">
      {/* left (logo + user) */}
      <div className="flex items-center space-x-3">
        <Image
          src={`${darkMode ? "/kiAIDark.png" : "/kiAI.png"}`}
          alt="logo"
          height={30}
          width={30}
        />
        <div className="flex cursor-pointer items-center space-x-2">
          <p className="h-8 w-8 rounded-full bg-linear-to-br from-sky-200 to-indigo-200"></p>
          <p className="text-primary-gray-700 flex items-center space-x-1 dark:text-gray-200">
            <span>joshuaosas</span>
            <span className="mt-1">
              <HiChevronDown />
            </span>
          </p>
        </div>
      </div>

      {/* center (routes - hidden on mobile) */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
        <div className="bg-primary-gray-200 flex items-center space-x-3 rounded-2xl px-3 py-1 dark:bg-gray-800">
          {routes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.id}
                href={route.path}
                className={`rounded-lg px-3 py-2 text-2xl transition-colors hover:text-gray-500 ${
                  isActive
                    ? "bg-primary-gray-50 text-primary-gray-900 font-semibold shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-primary-gray-700 hover:text-primary-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {route.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* right actions (always visible) */}
      <div className="text-primary-gray-700 flex items-center space-x-2 dark:text-gray-200">
        <button className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
          <BsBellFill />
        </button>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {darkMode ? <FaMoon /> : <HiLightBulb />}
        </button>

        <p className="to-primary-yellow-400 from-primary-blue-500 h-8 w-8 rounded-full bg-linear-to-br"></p>

        {/* Hamburger (only mobile) */}
        <button
          className="rounded-md bg-gray-100 p-2 transition hover:bg-gray-200 md:hidden dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <HiMiniXMark className="text-2xl" />
          ) : (
            <HiBars3 className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile drawer menu */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 md:hidden dark:bg-gray-800 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <span className="text-lg font-semibold dark:text-white">
            <Image
              src={`${darkMode ? "/kiAIDark.png" : "/kiAI.png"}`}
              alt="logo"
              height={30}
              width={30}
            />
          </span>
          <button onClick={() => setMenuOpen(false)}>
            <HiMiniXMark className="text-2xl dark:text-white" />
          </button>
        </div>
        <div className="flex flex-col space-y-2 p-4">
          {routes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.id}
                href={route.path}
                className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-lg transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                  isActive
                    ? "bg-primary-gray-50 text-primary-gray-900 font-semibold shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-primary-gray-700 hover:text-primary-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {route.name}
                <span>{route.label}</span>
              </Link>
            );
          })}
          <Link
            href="#"
            className="flex items-center space-x-2 rounded-lg px-3 py-2 text-lg transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <BsImage />
            <span>Gallery</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-2 rounded-lg px-3 py-2 text-lg transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <BsHeadset />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
