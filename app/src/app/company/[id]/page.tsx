import Link from "next/link";
import { companies, businessCategories } from "@/data/mockData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CompanyPage({ params }: PageProps) {
  const { id } = await params;
  const companyId = parseInt(id, 10);
  
  const company = companies.find((c) => c.id === companyId);
  if (!company) {
    notFound();
  }

  const categoryData = businessCategories.find((c) => c.slug === company.category);
  const subcategoryData = categoryData?.subcategories.find((s) => s.slug === company.subcategory);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      {/* Header */}
      <header className="bg-[#820251] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-yellow-400">Biznes</span>
              <span className="text-white">.lucheestiy.com</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm">
              <Link href="/#catalog" className="hover:text-yellow-400 transition-colors">Каталог</Link>
              <Link href="/#news" className="hover:text-yellow-400 transition-colors">Новости</Link>
              <Link href="/#promotions" className="hover:text-yellow-400 transition-colors">Акции</Link>
              <Link href="/#about" className="hover:text-yellow-400 transition-colors">О проекте</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <Link href="/" className="hover:text-[#820251]">Главная</Link>
              <span>/</span>
              <Link href="/#catalog" className="hover:text-[#820251]">Каталог</Link>
              <span>/</span>
              <Link href={`/catalog/${company.category}`} className="hover:text-[#820251]">{categoryData?.name}</Link>
              <span>/</span>
              <Link href={`/catalog/${company.category}/${company.subcategory}`} className="hover:text-[#820251]">{subcategoryData?.name}</Link>
              <span>/</span>
              <span className="text-[#820251] font-medium">{company.name}</span>
            </div>
          </div>
        </div>

        {/* Company Header */}
        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <p className="text-pink-200 mt-2">{categoryData?.name} → {subcategoryData?.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-[#820251] px-4 py-2 rounded-lg">
                  <div className="text-2xl font-bold flex items-center gap-1">★ {company.rating}</div>
                  <div className="text-xs">{company.reviews} отзывов</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Content */}
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  О компании
                </h2>
                <p className="text-gray-700 leading-relaxed">{company.description}</p>
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  Услуги
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-[#820251]">✓</span>
                    Диагностика автомобиля
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#820251]">✓</span>
                    Ремонт двигателя
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#820251]">✓</span>
                    Ремонт ходовой части
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#820251]">✓</span>
                    Шиномонтаж
                  </li>
                </ul>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#820251] rounded"></span>
                  Отзывы ({company.reviews})
                </h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="font-medium">Александр</span>
                      <span className="text-gray-400 text-sm">• 2 дня назад</span>
                    </div>
                    <p className="text-gray-600">Отличный сервис! Быстро и качественно отремонтировали подвеску. Рекомендую!</p>
                  </div>
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="font-medium">Елена</span>
                      <span className="text-gray-400 text-sm">• 1 неделю назад</span>
                    </div>
                    <p className="text-gray-600">Хороший автосервис, приятные цены. Немного пришлось подождать, но результат порадовал.</p>
                  </div>
                </div>
                <button className="mt-4 text-[#820251] font-medium hover:underline">
                  Показать все отзывы →
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Контакты</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Адрес</div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#820251]">📍</span>
                      <span className="text-gray-700">{company.address}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Телефон</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#820251]">📞</span>
                      <a href={`tel:${company.phone}`} className="text-[#820251] font-bold text-lg hover:underline">
                        {company.phone}
                      </a>
                    </div>
                  </div>
                  {company.website && (
                    <div>
                      <div className="text-gray-500 text-sm mb-1">Сайт</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#820251]">🌐</span>
                        <a 
                          href={`https://${company.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#820251] hover:underline"
                        >
                          {company.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <button className="w-full mt-6 bg-[#820251] text-white py-3 rounded-lg font-semibold hover:bg-[#6a0143] transition-colors">
                  Позвонить
                </button>
                <button className="w-full mt-3 border-2 border-[#820251] text-[#820251] py-3 rounded-lg font-semibold hover:bg-[#820251] hover:text-white transition-colors">
                  Написать сообщение
                </button>
              </div>

              {/* Work Hours */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Время работы</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Пн-Пт</span>
                    <span className="font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Сб</span>
                    <span className="font-medium">10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Вс</span>
                    <span className="font-medium text-red-500">Выходной</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="container mx-auto pb-10 px-4">
          <Link 
            href={`/catalog/${company.category}/${company.subcategory}`}
            className="inline-flex items-center gap-2 text-[#820251] hover:underline"
          >
            ← Вернуться к списку
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2d2d2d] text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; 2026 Biznes.lucheestiy.com. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
