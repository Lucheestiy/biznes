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
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = use(params);
  const { t } = useLanguage();
  const { selectedRegion, setSelectedRegion, regionName } = useRegion();

  const categoryData = businessCategories.find((c) => c.slug === category);
  if (!categoryData) {
    notFound();
  }

  // Get companies for this category
  let categoryCompanies = companies.filter((c) => c.category === category);

  // Filter by region if selected
  if (selectedRegion) {
    const regionSlugs = regionMapping[selectedRegion] || [selectedRegion];
    categoryCompanies = categoryCompanies.filter((c) => regionSlugs.includes(c.region));
  }

  // Count companies per subcategory
  const subcategoryCounts = categoryData.subcategories.map((sub) => {
    const count = categoryCompanies.filter((c) => c.subcategory === sub.slug).length;
    return { ...sub, actualCount: count };
  });

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
              <span className="text-[#820251] font-medium">{t(`cat.${category}`)}</span>
            </div>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{categoryData.icon}</span>
              <div>
                <h1 className="text-3xl font-bold">{t(`cat.${category}`)}</h1>
                <p className="text-pink-200 mt-1">{t(`cat.${category}.desc`)}</p>
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

        {/* Subcategories */}
        <div className="container mx-auto py-10 px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#820251] rounded"></span>
            {t("catalog.subcategories")}
            {selectedRegion && (
              <span className="text-sm font-normal text-gray-500">
                — {regionName}
              </span>
            )}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subcategoryCounts.map((sub) => (
              <Link
                key={sub.slug}
                href={`/catalog/${category}/${sub.slug}`}
                className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#820251] flex justify-between items-center group"
              >
                <span className="font-medium text-gray-700 group-hover:text-[#820251]">
                  {t(`subcat.${sub.slug}`)}
                </span>
                <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  {sub.actualCount > 0 ? sub.actualCount : sub.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Show companies if region is selected */}
        {selectedRegion && categoryCompanies.length > 0 && (
          <div className="container mx-auto pb-10 px-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#820251] rounded"></span>
              {t("catalog.companies")} ({categoryCompanies.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryCompanies.slice(0, 6).map((company) => (
                <CompanyCard key={company.id} company={company} showCategory />
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="container mx-auto pb-10 px-4">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 text-[#820251] hover:underline"
          >
            ← {t("catalog.backToCatalog")}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
