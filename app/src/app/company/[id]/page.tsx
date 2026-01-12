"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import MessageModal from "@/components/MessageModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import type { IbizCompanyResponse, IbizPhoneExt } from "@/lib/ibiz/types";
import { IBIZ_CATEGORY_ICONS } from "@/lib/ibiz/icons";

interface PageProps {
  params: Promise<{ id: string }>;
}

function displayUrl(raw: string): string {
  const s = (raw || "").trim();
  if (!s) return "";
  try {
    const u = new URL(s);
    return u.hostname || s;
  } catch {
    return s.replace(/^https?:\/\//i, "").split("/")[0] || s;
  }
}

export default function CompanyPage({ params }: PageProps) {
  const { id } = use(params);
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [data, setData] = useState<IbizCompanyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLogoFailed(false);
    fetch(`/api/ibiz/company/${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((resp: IbizCompanyResponse | null) => {
        if (!isMounted) return;
        setData(resp);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setData(null);
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-gray-100">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#820251] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">{t("common.loading")}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-gray-100">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto py-10 px-4">
            <div className="bg-white rounded-lg p-10 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{t("company.notFound")}</h3>
              <p className="text-gray-500 mb-6">Компания не найдена: {id}</p>
              <Link
                href="/#catalog"
                className="inline-block bg-[#820251] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6a0143] transition-colors"
              >
                {t("nav.catalog")}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const company = data.company;
  const favorite = isFavorite(company.source_id);

  const primaryCategory = company.categories?.[0] ?? null;
  const primaryRubric = company.rubrics?.[0] ?? null;

  const icon = primaryCategory?.slug ? IBIZ_CATEGORY_ICONS[primaryCategory.slug] || "🏢" : "🏢";
  const logoUrl = (company.logo_url || "").trim();
  const showLogo = Boolean(logoUrl) && !logoFailed;

  const phones: IbizPhoneExt[] = useMemo(() => {
    if (company.phones_ext && company.phones_ext.length > 0) return company.phones_ext;
    return (company.phones || []).map((number) => ({ number, labels: [] as string[] }));
  }, [company.phones, company.phones_ext]);

  const primaryPhone = phones?.[0]?.number || "";
  const primaryEmail = company.emails?.[0] || "";
  const primaryWebsite = company.websites?.[0] || "";

  const aboutText = (company.about || company.description || "").trim();

  const categoryLink = primaryCategory ? `/catalog/${primaryCategory.slug}` : "/#catalog";
  const rubricSubSlug = primaryRubric ? primaryRubric.slug.split("/").slice(1).join("/") : "";
  const rubricLink = primaryCategory && rubricSubSlug ? `/catalog/${primaryCategory.slug}/${rubricSubSlug}` : categoryLink;

  const hasGeo = company.extra?.lat != null && company.extra?.lng != null;
  const lat = company.extra?.lat ?? null;
  const lng = company.extra?.lng ?? null;

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
              {primaryCategory && (
                <>
                  <span>/</span>
                  <Link href={categoryLink} className="hover:text-[#820251]">{primaryCategory.name}</Link>
                </>
              )}
              {primaryRubric && (
                <>
                  <span>/</span>
                  <Link href={rubricLink} className="hover:text-[#820251]">{primaryRubric.name}</Link>
                </>
              )}
              <span>/</span>
              <span className="text-[#820251] font-medium">{company.name}</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {showLogo ? (
                      <img
                        src={logoUrl}
                        alt={company.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={() => setLogoFailed(true)}
                      />
                    ) : (
                      <span className="text-4xl">{icon}</span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{company.name}</h1>
                    <p className="text-pink-200 mt-2">
                      {primaryCategory ? primaryCategory.name : ""}
                      {primaryRubric ? ` → ${primaryRubric.name}` : ""}
                      {company.city ? ` • ${company.city}` : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFavorite(company.source_id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    favorite ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
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

        {/* Content */}
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Contacts */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  {t("company.contacts")}
                </h2>

                <div className="space-y-4">
                  {company.websites && company.websites.length > 0 && (
                    <div>
                      <div className="text-gray-500 text-sm mb-1">{t("company.website")}</div>
                      <div className="space-y-1">
                        {company.websites.map((w) => (
                          <div key={w} className="flex items-center gap-2">
                            <span className="text-[#820251]">🌐</span>
                            <a
                              href={w}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#820251] font-bold hover:underline truncate"
                            >
                              {displayUrl(w)}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {company.emails && company.emails.length > 0 && (
                    <div>
                      <div className="text-gray-500 text-sm mb-1">{t("company.email")}</div>
                      <div className="space-y-1">
                        {company.emails.map((e) => (
                          <div key={e} className="flex items-center gap-2">
                            <span className="text-[#820251]">✉️</span>
                            <a
                              href={`https://mail.yandex.ru/compose?to=${encodeURIComponent(e)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#820251] hover:underline truncate"
                            >
                              {e}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phones && phones.length > 0 && (
                    <div>
                      <div className="text-gray-500 text-sm mb-2">{t("company.phone")}</div>
                      <div className="space-y-2">
                        {phones.map((p, idx) => (
                          <div key={`${p.number}-${idx}`} className="flex items-start gap-2">
                            <span className="text-[#820251] mt-0.5">📞</span>
                            <div>
                              <a href={`tel:${p.number}`} className="text-[#820251] font-bold hover:underline">
                                {p.number}
                              </a>
                              {p.labels && p.labels.length > 0 && (
                                <div className="text-sm text-gray-500">{p.labels.join(", ")}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {company.address && (
                    <div>
                      <div className="text-gray-500 text-sm mb-1">{t("company.address")}</div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#820251]">📍</span>
                        <span className="text-gray-700">{company.address}</span>
                      </div>
                    </div>
                  )}

                  {(company.unp || company.contact_person) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {company.unp && (
                        <div>
                          <div className="text-gray-500 text-sm mb-1">УНП</div>
                          <div className="text-gray-700 font-medium">{company.unp}</div>
                        </div>
                      )}
                      {company.contact_person && (
                        <div>
                          <div className="text-gray-500 text-sm mb-1">Контактное лицо</div>
                          <div className="text-gray-700 font-medium">{company.contact_person}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {company.work_hours &&
                    (company.work_hours.work_time || company.work_hours.break_time || company.work_hours.status) && (
                      <div>
                        <div className="text-gray-500 text-sm mb-1">{t("company.workHours")}</div>
                        <div className="text-gray-700 space-y-1">
                          {company.work_hours.work_time && <div>{company.work_hours.work_time}</div>}
                          {company.work_hours.break_time && <div>Перерыв: {company.work_hours.break_time}</div>}
                          {company.work_hours.status && <div className="text-sm text-gray-500">{company.work_hours.status}</div>}
                        </div>
                      </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={primaryPhone ? `tel:${primaryPhone}` : undefined}
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
                    <AIAssistant companyName={company.name} companyId={company.source_id} isActive={false} />
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  {t("company.about")}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {aboutText || "—"}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Источник</h2>
                <a
                  href={company.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#820251] hover:underline break-all"
                >
                  {company.source_url}
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          {hasGeo && lat != null && lng != null && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  {t("company.locationOnMap")}
                </h2>
                <a
                  href={`https://yandex.ru/maps/?rtext=~${lat},${lng}&rtt=auto`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#820251] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#6a0143] transition-colors text-sm"
                >
                  {t("company.buildRoute")}
                </a>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${lng}%2C${lat}&z=16&pt=${lng}%2C${lat}%2Cpm2rdm`}
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
              href={rubricLink}
              className="inline-flex items-center gap-2 text-[#820251] hover:underline"
            >
              ← {t("catalog.backToCategory")} {primaryRubric ? primaryRubric.name : primaryCategory?.name || t("nav.catalog")}
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        companyName={company.name}
        companyId={company.source_id}
        email={primaryEmail || undefined}
        phone={primaryPhone || undefined}
        hasAI={false}
      />
    </div>
  );
}
