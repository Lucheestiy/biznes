"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "ru", name: "Русский", flag: "RU" },
  { code: "en", name: "English", flag: "EN" },
  { code: "be", name: "Беларуская", flag: "BY" },
  { code: "zh", name: "中文", flag: "CN" },
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { regionName } = useRegion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="bg-[#820251] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-yellow-400">Biznes</span>
            <span className="text-white">.lucheestiy.com</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/#catalog" className="hover:text-yellow-400 transition-colors">
              {t("nav.catalog")}
            </Link>
            <Link href="/#news" className="hover:text-yellow-400 transition-colors">
              {t("nav.news")}
            </Link>
            <Link href="/favorites" className="hover:text-yellow-400 transition-colors">
              {t("nav.favorites")}
            </Link>
            <Link href="/#about" className="hover:text-yellow-400 transition-colors">
              {t("nav.about")}
            </Link>
          </nav>

          {/* Right side: Region indicator, Language, Add button */}
          <div className="flex items-center gap-3">
            {/* Region indicator */}
            <div className="hidden lg:flex items-center gap-1 text-xs text-pink-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{regionName}</span>
            </div>

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#6a0143] transition-colors text-sm"
              >
                <span>{currentLang.flag}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-20 py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 ${
                          language === lang.code ? "text-[#820251] font-medium" : "text-gray-700"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Add company button */}
            <Link
              href="/add-company"
              className="hidden md:block bg-yellow-500 text-[#820251] px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors text-sm"
            >
              {t("nav.addCompany")}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#6a0143]">
            <nav className="flex flex-col gap-3">
              <Link
                href="/#catalog"
                className="hover:text-yellow-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.catalog")}
              </Link>
              <Link
                href="/#news"
                className="hover:text-yellow-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.news")}
              </Link>
              <Link
                href="/favorites"
                className="hover:text-yellow-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.favorites")}
              </Link>
              <Link
                href="/#about"
                className="hover:text-yellow-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <div className="pt-2 border-t border-[#6a0143]">
                <Link
                  href="/add-company"
                  className="inline-block bg-yellow-500 text-[#820251] px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.addCompany")}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
