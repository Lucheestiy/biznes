import Link from "next/link";
import { companies, regions, regionMapping, businessCategories } from "@/data/mockData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RegionPage({ params }: PageProps) {
  const { slug } = await params;
  
  const regionData = regions.find((r) => r.slug === slug);
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
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#820251]">Главная</Link>
              <span>/</span>
              <span className="text-[#820251] font-medium">{regionData.name}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">📍</span>
              <div>
                <h1 className="text-3xl font-bold">{regionData.name}</h1>
                <p className="text-pink-200 mt-1">
                  Найдено {filteredCompanies.length} компаний в регионе
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Link
                  key={region.slug}
                  href={"/region/" + region.slug}
                  className={
                    region.slug === slug
                      ? "px-4 py-2 rounded-full text-sm font-medium bg-[#820251] text-white"
                      : "px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                >
                  {region.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

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
                    {categoryCompanies.map((company) => {
                      const subcategory = category.subcategories.find(
                        (s) => s.slug === company.subcategory
                      );
                      
                      return (
                        <div 
                          key={company.id} 
                          className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
                        >
                          <div className="bg-gradient-to-r from-[#820251] to-[#6a0143] p-4">
                            <div className="flex items-start justify-between">
                              <h3 className="font-bold text-white text-lg leading-tight">{company.name}</h3>
                              <span className="bg-yellow-400 text-[#820251] px-2 py-1 rounded text-sm font-bold whitespace-nowrap">
                                ★ {company.rating}
                              </span>
                            </div>
                            {subcategory && (
                              <span className="inline-block mt-2 text-xs text-pink-200 bg-white/10 px-2 py-1 rounded">
                                {subcategory.name}
                              </span>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start gap-2">
                                <span className="text-gray-400">📍</span>
                                <span className="text-gray-700">{company.address}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">📞</span>
                                <a href={"tel:" + company.phone} className="text-[#820251] font-medium hover:underline">
                                  {company.phone}
                                </a>
                              </div>
                              {company.website && (
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-400">🌐</span>
                                  <a 
                                    href={"https://" + company.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#820251] hover:underline truncate"
                                  >
                                    {company.website}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-gray-500">{company.reviews} отзывов</span>
                            <Link 
                              href={"/company/" + company.id}
                              className="bg-[#820251] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#6a0143] transition-colors"
                            >
                              Подробнее
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-lg p-10 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Компании не найдены</h3>
              <p className="text-gray-500">В данном регионе пока нет зарегистрированных компаний</p>
            </div>
          )}
        </div>

        <div className="container mx-auto pb-10 px-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#820251] hover:underline"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </main>

      <footer className="bg-[#2d2d2d] text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          © 2026 Biznes.lucheestiy.com. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
