"use client";

import Link from "next/link";
import { useState, use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import MessageModal from "@/components/MessageModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { companies, businessCategories, regions } from "@/data/mockData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CompanyPage({ params }: PageProps) {
  const { id } = use(params);
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const companyId = parseInt(id, 10);
  const company = companies.find((c) => c.id === companyId);

  if (!company) {
    notFound();
  }

  const categoryData = businessCategories.find((c) => c.slug === company.category);
  const subcategoryData = categoryData?.subcategories.find((s) => s.slug === company.subcategory);
  const regionData = regions.find((r) => r.slug === company.region);
  const favorite = isFavorite(company.id);

  // Helper to get translated company data with fallback to original
  const getCompanyData = (field: string, fallback: string) => {
    const key = `company.${company.id}.${field}`;
    const translated = t(key);
    return translated !== key ? translated : fallback;
  };

  // Get translated company data
  const companyName = getCompanyData("name", company.name);
  const companyAddress = getCompanyData("address", company.address);
  const companyDescription = getCompanyData("description", company.description);
  const companyAbout = getCompanyData("about", company.about || company.description);

  // Get translated services and products (comma-separated string to array)
  const getTranslatedArray = (field: string, fallback: string[] | undefined) => {
    const key = `company.${company.id}.${field}`;
    const translated = t(key);
    if (translated !== key) {
      return translated.split(", ");
    }
    return fallback || [];
  };

  const companyServices = getTranslatedArray("services", company.services);
  const companyProducts = getTranslatedArray("products", company.products);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <Link href="/" className="hover:text-[#820251]">{t("common.home")}</Link>
              <span>/</span>
              <Link href="/#catalog" className="hover:text-[#820251]">{t("nav.catalog")}</Link>
              <span>/</span>
              <Link href={`/catalog/${company.category}`} className="hover:text-[#820251]">
                {t(`cat.${company.category}`)}
              </Link>
              <span>/</span>
              <Link href={`/catalog/${company.category}/${company.subcategory}`} className="hover:text-[#820251]">
                {t(`subcat.${company.subcategory}`)}
              </Link>
              <span>/</span>
              <span className="text-[#820251] font-medium">{companyName}</span>
            </div>
          </div>
        </div>

        {/* Company Header */}
        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  {/* Logo placeholder */}
                  <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">{categoryData?.icon || "🏢"}</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{companyName}</h1>
                    <p className="text-pink-200 mt-2">
                      {t(`cat.${company.category}`)} → {t(`subcat.${company.subcategory}`)}
                      {regionData && ` • ${t(`region.${company.region}`)}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFavorite(company.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    favorite
                      ? "bg-red-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
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
                  <span>{favorite ? t("favorites.remove") : t("favorites.add")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Company Content */}
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Card - Top */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  {t("company.contacts")}
                </h2>
                <div className="space-y-4">
                  {/* Website - first */}
                  {company.website && (
                    <div>
                      <div className="text-gray-500 text-sm mb-1">{t("company.website")}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#820251]">🌐</span>
                        <a
                          href={`https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#820251] font-bold text-lg hover:underline"
                        >
                          {company.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Email - second (via Yandex Mail) */}
                  {company.email && (
                    <div>
                      <div className="text-gray-500 text-sm mb-1">{t("company.email")}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#820251]">✉️</span>
                        <a
                          href={`https://mail.yandex.ru/compose?to=${encodeURIComponent(company.email)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#820251] hover:underline"
                        >
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Phones - third */}
                  <div>
                    <div className="text-gray-500 text-sm mb-2">{t("company.phone")}</div>
                    <div className="space-y-2">
                      {company.phones.map((phone, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-[#820251]">📞</span>
                          <a href={`tel:${phone}`} className="text-[#820251] font-bold text-lg hover:underline">
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="text-gray-500 text-sm mb-1">{t("company.address")}</div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#820251]">📍</span>
                      <span className="text-gray-700">{companyAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={`tel:${company.phones[0]}`}
                    className="flex-1 min-w-[140px] bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
                  >
                    {t("company.call")}
                  </a>
                  <button
                    onClick={() => setMessageModalOpen(true)}
                    className="flex-1 min-w-[140px] border-2 border-[#820251] text-[#820251] py-3 rounded-lg font-semibold hover:bg-[#820251] hover:text-white transition-colors"
                  >
                    {t("company.write")}
                  </button>
                  <div className="w-full sm:w-auto">
                    <AIAssistant
                      companyName={companyName}
                      companyId={company.id}
                      isActive={false}
                    />
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  {t("company.about")}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {companyAbout}
                </p>
                {/* SEO text */}
                {company.seoText && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {company.seoText}
                    </p>
                  </div>
                )}
                {/* SEO keywords as tags */}
                {company.seoKeywords && company.seoKeywords.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {company.seoKeywords.slice(0, 6).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Products */}
              {companyProducts && companyProducts.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#820251] rounded"></span>
                    {t("company.products")}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {companyProducts.map((product, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                        {product}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              {companyServices && companyServices.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#820251] rounded"></span>
                    {t("company.services")}
                  </h2>
                  <ul className="space-y-2 text-gray-700">
                    {companyServices.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#820251]">✓</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Vacancies */}
              {company.vacancies && company.vacancies.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#820251] rounded"></span>
                    {t("company.vacancies")}
                  </h2>
                  <ul className="space-y-2">
                    {company.vacancies.map((vacancy, idx) => (
                      <li key={idx} className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                        <span className="text-yellow-600">💼</span>
                        <span className="text-gray-700">{vacancy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {company.gallery && company.gallery.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#820251] rounded"></span>
                    {t("company.gallery")}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {company.gallery.slice(0, 16).map((img, idx) => (
                      <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                        {img.startsWith("http") ? (
                          <img
                            src={img}
                            alt={`${company.name} - фото ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            📷
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Work Hours */}
              {company.workHours && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">{t("company.workHours")}</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("days.weekdays")}</span>
                      <span className="font-medium">
                        {company.workHours.weekdays === "Круглосуточно" ? t("days.roundClock") : company.workHours.weekdays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("days.saturday")}</span>
                      <span className="font-medium">
                        {company.workHours.saturday === "Выходной" ? t("days.dayOff") :
                         company.workHours.saturday === "По записи" ? t("days.byAppointment") :
                         company.workHours.saturday === "Круглосуточно" ? t("days.roundClock") : company.workHours.saturday}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("days.sunday")}</span>
                      <span className={`font-medium ${company.workHours.sunday === "Выходной" ? "text-red-500" : ""}`}>
                        {company.workHours.sunday === "Выходной" ? t("days.dayOff") :
                         company.workHours.sunday === "Круглосуточно" ? t("days.roundClock") : company.workHours.sunday}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">{t("company.quickActions")}</h2>
                <div className="space-y-3">
                  {company.viber && (
                    <a
                      href={`viber://chat?number=${company.viber.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <span className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                        📱
                      </span>
                      <span className="text-gray-700 font-medium">Viber</span>
                    </a>
                  )}
                  {company.telegram && (
                    <a
                      href={`https://t.me/${company.telegram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
                    >
                      <span className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white">
                        ✈️
                      </span>
                      <span className="text-gray-700 font-medium">Telegram</span>
                    </a>
                  )}
                  {company.whatsapp && (
                    <a
                      href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        📞
                      </span>
                      <span className="text-gray-700 font-medium">WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {/* AI Assistant promo - temporarily hidden, will be enabled later */}
            </div>
          </div>

          {/* Map */}
          {company.coordinates && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  {t("company.locationOnMap")}
                </h2>
                <a
                  href={`https://yandex.ru/maps/?rtext=~${company.coordinates.lat},${company.coordinates.lng}&rtt=auto`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#820251] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#6a0143] transition-colors text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {t("company.buildRoute")}
                </a>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${company.coordinates.lng}%2C${company.coordinates.lat}&z=16&pt=${company.coordinates.lng}%2C${company.coordinates.lat}%2Cpm2rdm`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-8">
            <Link
              href={`/catalog/${company.category}/${company.subcategory}`}
              className="inline-flex items-center gap-2 text-[#820251] hover:underline"
            >
              ← {t("catalog.backToCategory")} {t(`subcat.${company.subcategory}`)}
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Message Modal */}
      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        companyName={companyName}
        companyId={company.id}
        email={company.email}
        phone={company.phones[0]}
        hasAI={company.hasAI && company.isPaid}
      />
    </div>
  );
}
