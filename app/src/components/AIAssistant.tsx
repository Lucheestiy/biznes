"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AIAssistantProps {
  floating?: boolean;
  companyName?: string;
  companyId?: number;
  isActive?: boolean;
}

export default function AIAssistant({
  floating = false,
  companyName,
  companyId,
  isActive = true,
}: AIAssistantProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Here would be the API call to send the request to AI
    console.log("AI Request:", { message, companyName, companyId });
    setSubmitted(true);
    setMessage("");

    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 3000);
  };

  // Floating button on main page
  if (floating) {
    return (
      <>
        {/* Floating button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#820251] to-[#5a0138] text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center gap-3 z-40"
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-[#820251]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="font-bold text-lg">{t("ai.title")}</span>
        </button>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
              <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-[#820251]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{t("ai.title")}</h2>
                      <p className="text-sm text-pink-200">{t("ai.personalAssistant")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t("ai.requestSent")}</h3>
                    <p className="text-gray-600">{t("ai.requestProcessing")}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">{t("ai.description")}</p>
                    <form onSubmit={handleSubmit}>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t("ai.placeholder")}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#820251] resize-none h-32"
                      />
                      <button
                        type="submit"
                        className="w-full mt-4 bg-[#820251] text-white py-3 rounded-lg font-semibold hover:bg-[#6a0143] transition-colors"
                      >
                        {t("ai.sendRequest")}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Button in company card - inactive state (no highlight, muted appearance)
  if (!isActive) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed border border-gray-200"
        title={t("ai.inactive")}
      >
        <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="text-sm font-normal">{t("ai.title")}</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#820251] to-[#5a0138] text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="text-sm font-medium">{t("ai.title")}</span>
      </button>

      {/* Modal for company-specific AI */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{t("ai.title")}</h2>
                  {companyName && (
                    <p className="text-sm text-pink-200">{t("ai.requestTo")} {companyName}</p>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t("ai.prioritySent")}</h3>
                  <p className="text-gray-600">{t("ai.priorityDesc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("ai.describePlaceholder")}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#820251] resize-none h-32"
                  />
                  <button
                    type="submit"
                    className="w-full mt-4 bg-[#820251] text-white py-3 rounded-lg font-semibold hover:bg-[#6a0143] transition-colors"
                  >
                    {t("ai.sendRequest")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
