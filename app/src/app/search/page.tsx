"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { companies, regions, regionMapping, businessCategories } from "@/data/mockData";
import Link from "next/link";

function SearchResults() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { selectedRegion, setSelectedRegion, regionName } = useRegion();

  const query = searchParams.get("q") || "";

  // Filter companies by search query
  let filteredCompanies = companies;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredCompanies = companies.filter((company) => {
      return (
        company.name.toLowerCase().includes(lowerQuery) ||
        company.description.toLowerCase().includes(lowerQuery) ||
        company.services?.some((s) => s.toLowerCase().includes(lowerQuery)) ||
        company.products?.some((p) => p.toLowerCase().includes(lowerQuery))
      );
    });
  }

  // Filter by region if selected
  if (selectedRegion) {
    const regionSlugs = regionMapping[selectedRegion] || [selectedRegion];
    filteredCompanies = filteredCompanies.filter((c) => regionSlugs.includes(c.region));
  }

  // Group results by category
  const resultsByCategory = filteredCompanies.reduce((acc, company) => {
    if (!acc[company.category]) {
      acc[company.category] = [];
    }
    acc[company.category].push(company);
    return acc;
  }, {} as Record<string, typeof companies>);

  const categoriesWithResults = Object.keys(resultsByCategory);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <Header />

      <main className="flex-grow">
        {/* Search Header */}
        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">{t("search.results")}</h1>
            <SearchBar variant="compact" />
          </div>
        </div>

        {/* Region Filter */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-600 font-medium">{t("filter.region")}:</span>
              <button
                onClick={() => setSelectedRegion(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedRegion
                    ? "bg-[#820251] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("search.allRegions")}
              </button>
              {regions.map((region) => (
                <button
                  key={region.slug}
                  onClick={() => setSelectedRegion(region.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedRegion === region.slug
                      ? "bg-[#820251] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t(`region.${region.slug}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="container mx-auto py-10 px-4">
          {/* Query info */}
          {query && (
            <div className="mb-6">
              <p className="text-gray-600">
                {t("search.resultsFor")}: <span className="font-semibold text-gray-800">«{query}»</span>
                {selectedRegion && (
                  <span className="text-gray-500"> — {regionName}</span>
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t("search.found")}: {filteredCompanies.length} {t("catalog.companies").toLowerCase()}
              </p>
            </div>
          )}

          {filteredCompanies.length === 0 ? (
            <div className="bg-white rounded-lg p-10 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{t("company.notFound")}</h3>
              <p className="text-gray-500 mb-4">{t("company.notFoundDesc")}</p>
              {selectedRegion && (
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-[#820251] hover:underline mb-4 block mx-auto"
                >
                  {t("company.showAllRegions")}
                </button>
              )}
              <Link
                href="/#catalog"
                className="inline-block bg-[#820251] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6a0143] transition-colors"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Categories summary */}
              {categoriesWithResults.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {categoriesWithResults.map((catSlug) => {
                    const cat = businessCategories.find((c) => c.slug === catSlug);
                    if (!cat) return null;
                    const count = resultsByCategory[catSlug].length;
                    return (
                      <a
                        key={catSlug}
                        href={`#category-${catSlug}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200 hover:border-[#820251] hover:text-[#820251] transition-colors"
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span className="text-gray-400">({count})</span>
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Results by category */}
              {categoriesWithResults.map((catSlug) => {
                const cat = businessCategories.find((c) => c.slug === catSlug);
                if (!cat) return null;
                const categoryCompanies = resultsByCategory[catSlug];

                return (
                  <div key={catSlug} id={`category-${catSlug}`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="text-sm font-normal text-gray-500">
                        ({categoryCompanies.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryCompanies.map((company) => (
                        <CompanyCard key={company.id} company={company} showCategory />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col font-sans bg-gray-100">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#820251] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Загрузка...</p>
          </div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
