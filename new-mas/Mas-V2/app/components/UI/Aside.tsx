"use client";

import { Sun, Moon, X, Languages } from "lucide-react";
import { useTheme } from "@/app/hooks/useTheme";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useTranslation } from "react-i18next";

interface AsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Aside({ isOpen, onClose }: AsideProps) {
  const { dark, toggle } = useTheme();
  const { lang, toggle: toggleLang } = useLanguage();
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  return (
    <>
      {/* Sidebar */}
      <div
  className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} h-full bg-surface shadow-lg transform transition-transform duration-300 z-50
    w-48 sm:w-56 md:w-64 lg:w-72
    ${isOpen 
      ? "translate-x-0" 
      : isRTL 
        ? "translate-x-full" 
        : "-translate-x-full"
    }`}
>
        <div className="p-3 sm:p-4 flex flex-col h-full">

          {/* Header: title + close */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
              Sidebar Menu
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <span className="sr-only">Close sidebar</span>
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation links */}
          <ul className="space-y-1 flex-1">
            <li>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-sm sm:text-base text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-sm sm:text-base text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-sm sm:text-base text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-sm sm:text-base text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                Logout
              </a>
            </li>
          </ul>

          {/* Controls — pinned to bottom */}
          <div className="pt-4 border-t border-border space-y-1">
            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <Languages className="size-4 text-mainBlue shrink-0" />
              <span>{lang === "en" ? "العربية" : "English"}</span>
            </button>
            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {dark ? (
                <>
                  <Sun className="size-4 text-amber-400 shrink-0" />
                  <span>Light mode</span>
                </>
              ) : (
                <>
                  <Moon className="size-4 text-mainBlue shrink-0" />
                  <span>Dark mode</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}