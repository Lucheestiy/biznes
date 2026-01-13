"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ServicesBlock from "@/components/ServicesBlock";
import NewsBlock from "@/components/NewsBlock";
import AIAssistant from "@/components/AIAssistant";
import { useLanguage } from "@/contexts/LanguageContext";
import { regions } from "@/data/regions";
import type { IbizCatalogCategory, IbizCatalogResponse } from "@/lib/ibiz/types";

export default function Home() {
  const { t } = useLanguage();
  const [catalog, setCatalog] = useState<IbizCatalogResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/ibiz/catalog")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!isMounted) return;
        setCatalog(data);
      })
      .catch(() => {
        if (!isMounted) return;
        setCatalog(null);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const formatCount = (value: number | null | undefined): string => {
    if (typeof value !== "number" || !Number.isFinite(value)) return "…";
    return new Intl.NumberFormat().format(value);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <Header />

      <main className="flex-grow">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-br from-[#820251] to-[#5a0138] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            {/* Add company link at top */}
            <div className="mb-6">
              <Link
                href="/add-company"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">{t("nav.addCompany")} ({t("about.submitRequest")})</span>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>

            {/* Search Box - Split into two fields */}
            <SearchBar variant="hero" />

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-10 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {formatCount(catalog?.stats?.companies_total)}
                </div>
                <div className="text-pink-200">{t("stats.companies")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {formatCount(catalog?.stats?.categories_total)}
                </div>
                <div className="text-pink-200">{t("stats.categories")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{formatCount(regions.length)}</div>
                <div className="text-pink-200">{t("stats.regions")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div id="catalog" className="container mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-[#820251] rounded"></span>
            {t("catalog.title")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(catalog?.categories || []).map((cat: IbizCatalogCategory) => (
              <Link
                key={cat.slug}
                href={`/catalog/${cat.slug}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center group border border-gray-100 hover:border-[#820251]"
              >
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                  {cat.icon || "🏢"}
                </span>
                <span className="font-medium text-gray-700 text-sm group-hover:text-[#820251]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <ServicesBlock />

        {/* News Section - 3 blocks */}
        <div className="bg-white py-12 border-y border-gray-200">
          <NewsBlock />
        </div>

        {/* Info Blocks - About section */}
        <div id="about" className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-[#820251] rounded"></span>
              {t("nav.about")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#820251] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{t("about.convenientSearch")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("about.convenientSearchDesc")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#820251] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{t("about.aiAssistant")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("about.aiAssistantDesc")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#820251] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{t("about.directContact")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("about.directContactDesc")}
                </p>
              </div>
            </div>

            {/* AI Assistant explanation */}
            <div className="mt-12 bg-gradient-to-r from-[#820251] to-[#5a0138] rounded-2xl p-8 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#820251]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t("ai.title")}</h3>
                <p className="text-pink-100 text-lg mb-6">
                  {t("about.aiExplanation")}
                </p>
                <p className="text-yellow-400 font-medium">
                  {t("about.aiPlatform")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating AI Assistant - only on main page */}
      <AIAssistant floating />
    </div>
  );
}
