"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface Service {
  nameKey: string;
  descKey: string;
  icon: string;
  link: string;
}

interface ServiceCategory {
  titleKey: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    titleKey: "services.marketing",
    services: [
      {
        nameKey: "services.analysis",
        descKey: "services.analysisDesc",
        icon: "📊",
        link: "/catalog/services",
      },
      {
        nameKey: "services.leads",
        descKey: "services.leadsDesc",
        icon: "📈",
        link: "/catalog/services",
      },
    ],
  },
  {
    titleKey: "services.automation",
    services: [
      {
        nameKey: "services.processAutomation",
        descKey: "services.processAutomationDesc",
        icon: "⚙️",
        link: "/catalog/it-telecom",
      },
      {
        nameKey: "services.crm",
        descKey: "services.crmDesc",
        icon: "🗂️",
        link: "/catalog/it-telecom",
      },
    ],
  },
  {
    titleKey: "services.digital",
    services: [
      {
        nameKey: "services.websites",
        descKey: "services.websitesDesc",
        icon: "💻",
        link: "/catalog/it-telecom/software",
      },
      {
        nameKey: "services.seo",
        descKey: "services.seoDesc",
        icon: "🔍",
        link: "/catalog/it-telecom",
      },
      {
        nameKey: "services.contextAds",
        descKey: "services.contextAdsDesc",
        icon: "📢",
        link: "/catalog/services",
      },
    ],
  },
  {
    titleKey: "services.aiIntegrations",
    services: [
      {
        nameKey: "services.aiBots",
        descKey: "services.aiBotsDesc",
        icon: "🤖",
        link: "/catalog/it-telecom",
      },
      {
        nameKey: "services.integrations",
        descKey: "services.integrationsDesc",
        icon: "🔗",
        link: "/catalog/it-telecom",
      },
    ],
  },
];

export default function ServicesBlock() {
  const { t } = useLanguage();

  return (
    <div id="services" className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="w-1 h-8 bg-[#820251] rounded"></span>
          {t("services.title")}
        </h2>
        <p className="text-gray-600 mb-8 ml-3">
          {t("services.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h3 className="font-bold text-gray-800 text-lg border-b-2 border-[#820251] pb-2">
                {t(category.titleKey)}
              </h3>
              <div className="space-y-3">
                {category.services.map((service, srvIdx) => (
                  <Link
                    key={srvIdx}
                    href={service.link}
                    className="block bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#820251] transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {service.icon}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-[#820251] transition-colors">
                          {t(service.nameKey)}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {t(service.descKey)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#820251] to-[#5a0138] text-white px-8 py-4 rounded-xl flex-wrap justify-center">
            <div className="text-left">
              <div className="font-bold text-lg">{t("services.consultation")}</div>
              <div className="text-pink-200 text-sm">{t("services.consultationDesc")}</div>
            </div>
            <a
              href="https://mail.yandex.ru/compose?to=surdoe@yandex.ru&subject=Консультация по услугам"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-[#820251] px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors whitespace-nowrap"
            >
              {t("services.contactUs")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
