"use client";

import Link from "next/link";
import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { businessCategories, companies, regions, regionMapping } from "@/data/mockData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export default function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = use(params);
  const { t } = useLanguage();
  const { selectedRegion, setSelectedRegion, regionName } = useRegion();

  const categoryData = businessCategories.find((c) => c.slug === category);
  if (!categoryData) {
    notFound();
  }

  const subcategoryData = categoryData.subcategories.find((s) => s.slug === subcategory);
  if (!subcategoryData) {
    notFound();
  }

  // Filter by category and subcategory first
  let filteredCompanies = companies.filter(
    (c) => c.category === category && c.subcategory === subcategory
  );

  // Then filter by region if selected
  if (selectedRegion) {
    const regionSlugs = regionMapping[selectedRegion] || [selectedRegion];
    filteredCompanies = filteredCompanies.filter((c) => regionSlugs.includes(c.region));
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#820251]">{t("common.home")}</Link>
              <span>/</span>
              <Link href="/#catalog" className="hover:text-[#820251]">{t("nav.catalog")}</Link>
              <span>/</span>
              <Link href={`/catalog/${category}`} className="hover:text-[#820251]">
                {t(`cat.${category}`)}
              </Link>
              <span>/</span>
              <span className="text-[#820251] font-medium">{t(`subcat.${subcategory}`)}</span>
            </div>
          </div>
        </div>

        {/* Subcategory Header */}
        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{categoryData.icon}</span>
              <div>
                <h1 className="text-3xl font-bold">{t(`subcat.${subcategory}`)}</h1>
                <p className="text-pink-200 mt-1">
                  {t(`cat.${category}`)} → {t(`subcat.${subcategory}`)} • {filteredCompanies.length} {t("catalog.companies").toLowerCase()}
                </p>
              </div>
            </div>
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

        {/* Companies List */}
        <div className="container mx-auto py-10 px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#820251] rounded"></span>
            {t("catalog.companies")} ({filteredCompanies.length})
            {selectedRegion && (
              <span className="text-sm font-normal text-gray-500">
                — {regionName}
              </span>
            )}
          </h2>

          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-10 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{t("company.notFound")}</h3>
              <p className="text-gray-500">{t("company.notFoundDesc")}</p>
              <button
                onClick={() => setSelectedRegion(null)}
                className="inline-block mt-4 text-[#820251] hover:underline"
              >
                {t("company.showAllRegions")}
              </button>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="container mx-auto pb-10 px-4">
          <Link
            href={`/catalog/${category}`}
            className="inline-flex items-center gap-2 text-[#820251] hover:underline"
          >
            ← {t("catalog.backToCategory")} {t(`cat.${category}`)}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
