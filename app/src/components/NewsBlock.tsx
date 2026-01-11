"use client";

import { useLanguage, Language } from "@/contexts/LanguageContext";

interface NewsItem {
  id: number;
  companyNameKey: string;
  companyLogo: string;
  titleKey: string;
  date: string;
  excerptKey: string;
  website: string;
}

// Corporate news from top Belarusian companies (non-sanctioned)
const corporateNews: NewsItem[] = [
  {
    id: 1,
    companyNameKey: "news.savushkin.name",
    companyLogo: "🥛",
    titleKey: "news.savushkin.title",
    date: "2026-01-05",
    excerptKey: "news.savushkin.excerpt",
    website: "https://www.savushkin.by",
  },
  {
    id: 2,
    companyNameKey: "news.santabremor.name",
    companyLogo: "🐟",
    titleKey: "news.santabremor.title",
    date: "2026-01-03",
    excerptKey: "news.santabremor.excerpt",
    website: "https://www.santa-bremor.by",
  },
  {
    id: 3,
    companyNameKey: "news.alutech.name",
    companyLogo: "🏗️",
    titleKey: "news.alutech.title",
    date: "2026-01-02",
    excerptKey: "news.alutech.excerpt",
    website: "https://www.alutech.by",
  },
];

const localeMap: Record<Language, string> = {
  ru: "ru-RU",
  en: "en-US",
  be: "be-BY",
  zh: "zh-CN",
};

export default function NewsBlock() {
  const { t, language } = useLanguage();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(localeMap[language], {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div id="news" className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <span className="w-1 h-8 bg-[#820251] rounded"></span>
        {t("news.corporate")}
      </h2>
      <p className="text-gray-600 mb-8 ml-3">
        {t("news.corporateSubtitle")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {corporateNews.map((news) => (
          <a
            key={news.id}
            href={news.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#820251] transition-all cursor-pointer h-full">
              {/* Company header */}
              <div className="bg-gradient-to-br from-[#820251] to-[#5a0138] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{news.companyLogo}</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">{t(news.companyNameKey)}</div>
                    <time className="text-xs text-pink-200">
                      {formatDate(news.date)}
                    </time>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-[#820251]">
                  {t(news.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {t(news.excerptKey)}
                </p>
                <div className="mt-3 text-[#820251] text-sm font-medium flex items-center gap-1">
                  {t("news.goToWebsite")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
}
