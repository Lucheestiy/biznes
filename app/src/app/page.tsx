import Link from "next/link";
import { businessCategories, regions, featuredCompanies } from "@/data/mockData";

export default function Home() {
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
              <Link href="#catalog" className="hover:text-yellow-400 transition-colors">Каталог</Link>
              <Link href="#news" className="hover:text-yellow-400 transition-colors">Новости</Link>
              <Link href="#promotions" className="hover:text-yellow-400 transition-colors">Акции</Link>
              <Link href="#about" className="hover:text-yellow-400 transition-colors">О проекте</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button className="hidden md:block bg-yellow-500 text-[#820251] px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors text-sm">
                Добавить компанию
              </button>
              <button className="md:hidden text-white">
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-br from-[#820251] to-[#5a0138] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Бизнес-справочник Беларуси
            </h1>
            <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
              Поиск предприятий, организаций и компаний. Товары и услуги от надёжных партнёров.
            </p>
            
            {/* Search Box */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl p-2 flex flex-col md:flex-row gap-2">
                <input 
                  type="text" 
                  placeholder="Название компании или услуги..." 
                  className="flex-grow p-3 text-gray-800 focus:outline-none rounded"
                />
                <select className="p-3 text-gray-600 border-l border-gray-200 bg-white rounded md:w-48">
                  <option value="">Все регионы</option>
                  {regions.map((region) => (
                    <option key={region.slug} value={region.slug}>{region.name}</option>
                  ))}
                </select>
                <button className="bg-[#820251] text-white px-8 py-3 rounded font-semibold hover:bg-[#6a0143] transition-colors">
                  Найти
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-10 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">12 500+</div>
                <div className="text-pink-200">Компаний</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">150+</div>
                <div className="text-pink-200">Категорий</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">7</div>
                <div className="text-pink-200">Регионов</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div id="catalog" className="container mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-[#820251] rounded"></span>
            Каталог по категориям
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {businessCategories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/catalog/${cat.slug}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center group border border-gray-100 hover:border-[#820251]"
              >
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="font-medium text-gray-700 text-sm group-hover:text-[#820251]">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Regions Section */}
        <div className="bg-white py-12 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-[#820251] rounded"></span>
              По регионам
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {regions.map((region) => (
                <Link 
                  key={region.slug} 
                  href={`/region/${region.slug}`}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-[#820251] hover:text-white transition-all text-center group"
                >
                  <div className="font-medium text-sm">{region.name}</div>
                  <div className="text-xs text-gray-500 group-hover:text-pink-200 mt-1">{region.count} компаний</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Companies */}
        <div className="container mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-[#820251] rounded"></span>
            Рекомендуемые компании
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCompanies.map((company) => (
              <div key={company.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-800">{company.name}</h3>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                    ★ {company.rating}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{company.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">{company.category}</span>
                  <span>{company.reviews} отзывов</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Blocks */}
        <div className="bg-gray-50 py-12 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#820251] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔍
                </div>
                <h3 className="font-bold text-lg mb-2">Удобный поиск</h3>
                <p className="text-gray-600 text-sm">Находите компании по названию, категории или региону</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#820251] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  ⭐
                </div>
                <h3 className="font-bold text-lg mb-2">Рейтинги и отзывы</h3>
                <p className="text-gray-600 text-sm">Читайте отзывы реальных клиентов</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#820251] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📞
                </div>
                <h3 className="font-bold text-lg mb-2">Прямой контакт</h3>
                <p className="text-gray-600 text-sm">Связывайтесь с компаниями напрямую</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2d2d2d] text-gray-400 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">
                <span className="text-yellow-400">Biznes</span>.lucheestiy.com
              </h4>
              <p className="text-sm">Бизнес-справочник предприятий и организаций Беларуси</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Для бизнеса</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Добавить компанию</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Реклама на сайте</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Тарифы</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm">
                {businessCategories.slice(0, 4).map(c => (
                  <li key={c.slug}><Link href={`/catalog/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Контакты</h4>
              <p className="text-sm">Email: info@biznes.lucheestiy.com</p>
              <p className="text-sm">Тел: +375 17 000-00-00</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm">
            &copy; 2026 Biznes.lucheestiy.com. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
