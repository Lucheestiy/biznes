"use client";

import Link from "next/link";
import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { companies, regions, regionMapping, businessCategories } from "@/data/mockData";
import { notFound } from "next/navigation";
import { useEffect } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function RegionPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t } = useLanguage();
  const { setSelectedRegion } = useRegion();

  const regionData = regions.find((r) => r.slug === slug);

  useEffect(() => {
    if (regionData) {
      setSelectedRegion(slug);
    }
  }, [slug, regionData, setSelectedRegion]);

  if (!regionData) {
    notFound();
  }

  const regionSlugs = regionMapping[slug] || [slug];
  const filteredCompanies = companies.filter((c) => regionSlugs.includes(c.region));

  const companiesByCategory = filteredCompanies.reduce((acc, company) => {
    if (!acc[company.category]) {
      acc[company.category] = [];
    }
    acc[company.category].push(company);
    return acc;
  }, {} as { [key: string]: typeof companies });

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
              <span className="text-[#820251] font-medium">{regionData.name}</span>
            </div>
          </div>
        </div>

        {/* Region Header */}
        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">📍</span>
              <div>
                <h1 className="text-3xl font-bold">{regionData.name}</h1>
                <p className="text-pink-200 mt-1">
                  {t("search.found")}: {filteredCompanies.length} {t("catalog.companies").toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Region Selector */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {t("search.allRegions")}
              </Link>
              {regions.map((region) => (
                <Link
                  key={region.slug}
                  href={`/region/${region.slug}`}
                  className={
                    region.slug === slug
                      ? "px-4 py-2 rounded-full text-sm font-medium bg-[#820251] text-white"
                      : "px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                >
                  {t(`region.${region.slug}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Companies */}
        <div className="container mx-auto py-10 px-4">
          {Object.keys(companiesByCategory).length > 0 ? (
            Object.entries(companiesByCategory).map(([categorySlug, categoryCompanies]) => {
              const category = businessCategories.find((c) => c.slug === categorySlug);
              if (!category) return null;

              return (
                <div key={categorySlug} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="w-1 h-6 bg-[#820251] rounded"></span>
                    {category.name} ({categoryCompanies.length})
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryCompanies.map((company) => (
                      <CompanyCard key={company.id} company={company} showCategory />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-lg p-10 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{t("company.notFound")}</h3>
              <p className="text-gray-500">{t("company.notFoundDesc")}</p>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="container mx-auto pb-10 px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#820251] hover:underline"
          >
            ← {t("common.home")}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
