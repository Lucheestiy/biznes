import Link from "next/link";
import { businessCategories, companies, regions, regionMapping } from "@/data/mockData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ region?: string }>;
}

export default async function SubcategoryPage({ params, searchParams }: PageProps) {
  const { category, subcategory } = await params;
  const { region: selectedRegion } = await searchParams;
  
  const categoryData = businessCategories.find((c) => c.slug === category);
  if (!categoryData) {
    notFound();
  }

  const subcategoryData = categoryData.subcategories.find((s) => s.slug === subcategory);
  if (!subcategoryData) {
    notFound();
  }

  // Filter by category and subcategory first
  let filteredCompanies = companies.filter(
    (c) => c.category === category && c.subcategory === subcategory
  );

  // Then filter by region if selected
  if (selectedRegion) {
    const regionSlugs = regionMapping[selectedRegion] || [selectedRegion];
    filteredCompanies = filteredCompanies.filter((c) => regionSlugs.includes(c.region));
  }

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
              <Link href="/#promotions" className="hover:text-yellow-400 transition-colors">Акции</Link>
              <Link href="/#about" className="hover:text-yellow-400 transition-colors">О проекте</Link>
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
              <Link href="/#catalog" className="hover:text-[#820251]">Каталог</Link>
              <span>/</span>
              <Link href={"/catalog/" + category} className="hover:text-[#820251]">{categoryData.name}</Link>
              <span>/</span>
              <span className="text-[#820251] font-medium">{subcategoryData.name}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#820251] to-[#5a0138] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{categoryData.icon}</span>
              <div>
                <h1 className="text-3xl font-bold">{subcategoryData.name}</h1>
                <p className="text-pink-200 mt-1">
                  {categoryData.name} → {subcategoryData.name} • {filteredCompanies.length} компаний
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Region Filter */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-600 font-medium">Регион:</span>
              <Link
                href={"/catalog/" + category + "/" + subcategory}
                className={
                  !selectedRegion
                    ? "px-4 py-2 rounded-full text-sm font-medium bg-[#820251] text-white"
                    : "px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              >
                Все регионы
              </Link>
              {regions.map((region) => (
                <Link
                  key={region.slug}
                  href={"/catalog/" + category + "/" + subcategory + "?region=" + region.slug}
                  className={
                    selectedRegion === region.slug
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
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#820251] rounded"></span>
            Компании ({filteredCompanies.length})
            {selectedRegion && (
              <span className="text-sm font-normal text-gray-500">
                — {regions.find(r => r.slug === selectedRegion)?.name}
              </span>
            )}
          </h2>
          
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <div 
                  key={company.id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-[#820251] to-[#6a0143] p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-white text-lg leading-tight">{company.name}</h3>
                      <span className="bg-yellow-400 text-[#820251] px-2 py-1 rounded text-sm font-bold flex items-center gap-1 whitespace-nowrap">
                        ★ {company.rating}
                      </span>
                    </div>
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
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-10 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Компании не найдены</h3>
              <p className="text-gray-500">В выбранном регионе нет компаний в этой категории</p>
              <Link 
                href={"/catalog/" + category + "/" + subcategory}
                className="inline-block mt-4 text-[#820251] hover:underline"
              >
                Показать все регионы
              </Link>
            </div>
          )}
        </div>

        <div className="container mx-auto pb-10 px-4">
          <Link 
            href={"/catalog/" + category}
            className="inline-flex items-center gap-2 text-[#820251] hover:underline"
          >
            ← Вернуться к категории {categoryData.name}
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
