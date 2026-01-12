"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { regions } from "@/data/regions";
import type { IbizSuggestResponse } from "@/lib/ibiz/types";

interface SearchBarProps {
  variant?: "hero" | "compact";
}

interface SearchSuggestion {
  type: "company" | "category" | "subcategory";
  text: string;
  url: string;
  icon: string;
  subtitle?: string;
  count?: number;
}

export default function SearchBar({ variant = "hero" }: SearchBarProps) {
  const { t } = useLanguage();
  const { selectedRegion, setSelectedRegion } = useRegion();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions when query/region changes
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const abort = new AbortController();
    const region = selectedRegion || "";
    fetch(`/api/ibiz/suggest?q=${encodeURIComponent(q)}&region=${encodeURIComponent(region)}`, {
      signal: abort.signal,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: IbizSuggestResponse | null) => {
        if (!data) return;
        const mapped: SearchSuggestion[] = (data.suggestions || [])
          .map((s) => {
            if (s.type === "company") {
              return {
                type: "company" as const,
                text: s.name,
                url: s.url,
                icon: s.icon || "🏢",
                subtitle: s.subtitle,
              };
            }
            if (s.type === "category") {
              return {
                type: "category" as const,
                text: s.name,
                url: s.url,
                icon: s.icon || "🏢",
                count: s.count,
              };
            }
            return {
              type: "subcategory" as const,
              text: s.name,
              url: s.url,
              icon: s.icon || "🏢",
              subtitle: s.category_name,
              count: s.count,
            };
          })
          .slice(0, 8);

        setSuggestions(mapped);
        setSelectedIndex(-1);
      })
      .catch(() => {
        // ignore (abort/network)
      });

    return () => abort.abort();
  }, [query, selectedRegion]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("q", query.trim());
    }
    if (selectedRegion) {
      params.set("region", selectedRegion);
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      router.push(suggestions[selectedIndex].url);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    setSelectedRegion(value);
  };

  const handleSuggestionClick = (url: string) => {
    setShowSuggestions(false);
    router.push(url);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder={t("search.placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 text-gray-800 border border-gray-300 rounded focus:outline-none focus:border-[#820251]"
        />
        <select
          value={selectedRegion || ""}
          onChange={handleRegionChange}
          className="p-2 text-gray-600 border border-gray-300 bg-white rounded focus:outline-none focus:border-[#820251]"
        >
          <option value="">{t("search.allRegions")}</option>
          {regions.map((region) => (
            <option key={region.slug} value={region.slug}>
              {t(`region.${region.slug}`)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-[#820251] text-white px-4 py-2 rounded font-semibold hover:bg-[#6a0143] transition-colors"
        >
          {t("search.find")}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl overflow-visible relative">
        <div className="flex flex-col md:flex-row">
          {/* Company/Service search field */}
          <div className="flex-grow relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder={t("search.placeholder")}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="w-full p-4 pl-12 text-gray-800 focus:outline-none text-lg rounded-l-lg"
            />

            {/* Autocomplete suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 z-50 overflow-hidden"
              >
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={`${suggestion.type}-${suggestion.url}`}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion.url)}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                      idx === selectedIndex ? "bg-gray-100" : ""
                    } ${idx > 0 ? "border-t border-gray-100" : ""}`}
                  >
                    <span className="text-xl flex-shrink-0">{suggestion.icon}</span>
                    <div className="flex-grow min-w-0">
                      <div className="font-medium text-gray-800 truncate">{suggestion.text}</div>
                      {suggestion.subtitle && (
                        <div className="text-sm text-gray-500 truncate">{suggestion.subtitle}</div>
                      )}
                      {suggestion.count !== undefined && (
                        <div className="text-sm text-gray-500 truncate">{suggestion.count} {t("search.subcategories")}</div>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        suggestion.type === "category"
                          ? "bg-purple-100 text-purple-700"
                          : suggestion.type === "subcategory"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {suggestion.type === "category"
                        ? t("search.category")
                        : suggestion.type === "subcategory"
                        ? t("search.section")
                        : t("search.company")}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vertical divider */}
          <div className="hidden md:flex items-center">
            <div className="w-[2px] h-10 bg-gray-300 rounded-full" />
          </div>

          {/* Region selector */}
          <div className="relative md:w-64 border-t md:border-t-0 border-gray-200">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <select
              value={selectedRegion || ""}
              onChange={handleRegionChange}
              className="w-full p-4 pl-12 text-gray-600 bg-white focus:outline-none appearance-none cursor-pointer text-lg"
            >
              <option value="">{t("search.allRegions")}</option>
              {regions.map((region) => (
                <option key={region.slug} value={region.slug}>
                  {t(`region.${region.slug}`)}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="bg-[#820251] text-white px-8 py-4 font-semibold hover:bg-[#6a0143] transition-colors text-lg rounded-r-lg"
          >
            {t("search.find")}
          </button>
        </div>
      </div>
    </form>
  );
}
