"use client";

import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/hooks/useLanguage";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { toggle } = useLanguage();
  const isAr = i18n.language === "ar";

  return (
    <button
      type="button"
      onClick={toggle}
      className="text-sm font-bold px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Switch language"
    >
      {isAr ? "EN" : "ع"}
    </button>
  );
}