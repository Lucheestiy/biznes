"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import AIAssistant from "./AIAssistant";
import MessageModal from "./MessageModal";
import { Company, businessCategories } from "@/data/mockData";

interface CompanyCardProps {
  company: Company;
  showCategory?: boolean;
}

export default function CompanyCard({ company, showCategory = false }: CompanyCardProps) {
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const categoryData = businessCategories.find((c) => c.slug === company.category);
  const subcategoryData = categoryData?.subcategories.find((s) => s.slug === company.subcategory);

  const favorite = isFavorite(company.id);

  // Helper to get translated company data with fallback to original
  const getCompanyData = (field: string, fallback: string) => {
    const key = `company.${company.id}.${field}`;
    const translated = t(key);
    return translated !== key ? translated : fallback;
  };

  const companyName = getCompanyData("name", company.name);
  const companyAddress = getCompanyData("address", company.address);

  // Generate Yandex Mail link
  const getYandexMailLink = (email: string) => {
    return `https://mail.yandex.ru/compose?to=${encodeURIComponent(email)}`;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden relative">
        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(company.id)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:shadow-md transition-all"
          title={favorite ? t("favorites.remove") : t("favorites.add")}
        >
          <svg
            className={`w-5 h-5 ${favorite ? "text-red-500 fill-current" : "text-gray-400"}`}
            fill={favorite ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Header with company name */}
        <div className="bg-gradient-to-r from-[#820251] to-[#6a0143] p-4 pr-12">
          <h3 className="font-bold text-white text-lg leading-tight">{companyName}</h3>
          {showCategory && subcategoryData && (
            <span className="inline-block mt-2 text-xs text-pink-200 bg-white/10 px-2 py-1 rounded">
              {t(`subcat.${company.subcategory}`)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Address */}
          <div className="flex items-start gap-2 mb-3 text-sm">
            <span className="text-[#820251] mt-0.5">📍</span>
            <span className="text-gray-700 leading-tight">{companyAddress}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-3"></div>

          {/* Contact info - reordered: Site → Email → Phone */}
          <div className="space-y-2 text-sm mb-4">
            {/* Website - first */}
            {company.website && (
              <div className="flex items-center gap-2">
                <span className="text-[#820251] w-5 text-center">🌐</span>
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#820251] font-medium hover:underline truncate"
                >
                  {company.website}
                </a>
              </div>
            )}

            {/* Email - second (via Yandex Mail) */}
            {company.email && (
              <div className="flex items-center gap-2">
                <span className="text-[#820251] w-5 text-center">✉️</span>
                <a
                  href={getYandexMailLink(company.email)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#820251] truncate"
                >
                  {company.email}
                </a>
              </div>
            )}

            {/* Phones - third (all phones) */}
            <div className="flex items-start gap-2">
              <span className="text-[#820251] w-5 text-center mt-0.5">📞</span>
              <div className="flex flex-col gap-1">
                {company.phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone}`}
                    className="text-[#820251] font-medium hover:underline"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${company.phones[0]}`}
              className="flex-1 min-w-[100px] bg-green-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors text-center"
            >
              {t("company.call")}
            </a>
            <button
              onClick={() => setMessageModalOpen(true)}
              className="flex-1 min-w-[100px] border-2 border-[#820251] text-[#820251] px-3 py-2 rounded text-sm font-medium hover:bg-[#820251] hover:text-white transition-colors"
            >
              {t("company.write")}
            </button>
          </div>
        </div>

        {/* Footer with AI and Details */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
          {/* AI Assistant button - temporarily disabled */}
          <AIAssistant
            companyName={companyName}
            companyId={company.id}
            isActive={false}
          />

          {/* Details link */}
          <Link
            href={`/company/${company.id}`}
            className="bg-[#820251] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#6a0143] transition-colors"
          >
            {t("company.details")}
          </Link>
        </div>

        {/* Logo placeholder in bottom right */}
        {company.logo ? (
          <div className="absolute bottom-16 right-4 w-16 h-16 rounded bg-white shadow-sm flex items-center justify-center overflow-hidden">
            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="absolute bottom-16 right-4 w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
            <span className="text-gray-300 text-xl">
              {categoryData?.icon || "🏢"}
            </span>
          </div>
        )}
      </div>

      {/* Message Modal */}
      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        companyName={companyName}
        companyId={company.id}
        email={company.email}
        phone={company.phones[0]}
        hasAI={false}
      />
    </>
  );
}
