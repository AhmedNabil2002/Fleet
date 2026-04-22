"use client";

import { useState, useEffect } from "react";
import i18n from "@/app/i18n/config";

type Lang = "en" | "ar";

function getCookieLang(): Lang {
  const match = document.cookie.match(/(?:^|;\s*)i18n_lang=([^;]+)/);
  const val = match?.[1];
  return val === "en" || val === "ar" ? val : "en";
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>("en");

  // Sync state from cookie on mount
  useEffect(() => {
    const current = getCookieLang();
    setLang(current);
  }, []);

  const toggle = () => {
    const next: Lang = lang === "en" ? "ar" : "en";
    setLang(next);

    // 1. Persist in cookie (SSR-readable by middleware)
    document.cookie = `i18n_lang=${next}; path=/; max-age=31536000; SameSite=Lax`;

    // 2. Update i18n (triggers languageChanged → I18nProvider updates dir/lang)
    i18n.changeLanguage(next);
  };

  return { lang, toggle };
}