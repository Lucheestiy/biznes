export interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
  slug: string;
  count: number;
}

export interface Company {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  region: string;
  address: string;
  phone: string;
  website?: string;
  description: string;
  rating: number;
  reviews: number;
}

export const companies: Company[] = [
  // ===== АВТОСЕРВИСЫ =====
  { id: 1, name: "24pds СТО ПроДизельСервис", category: "automobiles", subcategory: "service", region: "minsk", address: "Минск, Бетонный проезд, 19А", phone: "+375-29-601-24-24", website: "www.24pds.by", description: "Ремонт автоэлектрики, ТНВД, подвески и шиномонтаж", rating: 4.8, reviews: 156 },
  { id: 2, name: "Тракинтерсервис ООО", category: "automobiles", subcategory: "service", region: "minsk-region", address: "Минский р-н, пос. Привольный, ул. Мира, 14/40", phone: "+375-29-650-00-18", website: "truckinterservice.by", description: "Ремонт грузовых и легковых автомобилей, тягачей и прицепов", rating: 4.6, reviews: 89 },
  { id: 3, name: "Автоцентр PRO-WE", category: "automobiles", subcategory: "service", region: "brest", address: "Брестский р-н, д. Черни, ул. Зеленая, 49", phone: "+375-29-523-01-03", website: "www.pro-we.com", description: "3D развал-схождение легковых и грузовых автомобилей", rating: 4.9, reviews: 234 },
  { id: 4, name: "Аирсервис ЧУП", category: "automobiles", subcategory: "service", region: "minsk-region", address: "Минский р-н, пос. Привольный, ул. Мира, 12", phone: "+375-29-611-78-11", website: "www.airservice.by", description: "СТО по ремонту грузовой и специальной техники", rating: 4.5, reviews: 67 },
  { id: 5, name: "Веставто СП ОАО", category: "automobiles", subcategory: "service", region: "brest", address: "Брест, ул. Коммерческая, 17", phone: "+375-162-35-60-53", website: "www.westavto.by", description: "Ремонт грузовых автомобилей, шиномонтаж", rating: 4.4, reviews: 123 },
  { id: 6, name: "АвтоМастер Плюс", category: "automobiles", subcategory: "service", region: "minsk", address: "Минск, ул. Притыцкого, 62", phone: "+375-29-333-44-55", description: "Полный спектр услуг по ремонту легковых автомобилей", rating: 4.7, reviews: 312 },
  { id: 7, name: "СТО Профи Гомель", category: "automobiles", subcategory: "service", region: "gomel", address: "Гомель, ул. Советская, 78", phone: "+375-232-55-66-77", description: "Диагностика, ремонт двигателей, ходовой части", rating: 4.3, reviews: 98 },
  { id: 8, name: "Автосервис Европа", category: "automobiles", subcategory: "service", region: "vitebsk", address: "Витебск, пр. Московский, 25", phone: "+375-212-44-55-66", description: "Специализированный сервис для европейских автомобилей", rating: 4.8, reviews: 187 },
  { id: 9, name: "Региональный центр ЯМЗ", category: "automobiles", subcategory: "service", region: "minsk", address: "Минск, ул. Бабушкина, 21", phone: "+375-17-298-41-41", description: "Ремонт двигателей ЯМЗ, диагностика", rating: 4.5, reviews: 76 },
  { id: 10, name: "Гродно-Авто Сервис", category: "automobiles", subcategory: "service", region: "grodno", address: "Гродно, ул. Горького, 91", phone: "+375-152-77-88-99", description: "Комплексный ремонт автомобилей всех марок", rating: 4.6, reviews: 143 },
  { id: 11, name: "Могилёв АвтоТехЦентр", category: "automobiles", subcategory: "service", region: "mogilev", address: "Могилёв, ул. Челюскинцев, 45", phone: "+375-222-65-43-21", description: "Кузовной ремонт, покраска, полировка", rating: 4.4, reviews: 89 },
  { id: 12, name: "БелДизельСервис", category: "automobiles", subcategory: "service", region: "minsk", address: "Минск, ул. Радиальная, 15", phone: "+375-29-755-66-77", website: "bds.by", description: "Ремонт дизельных двигателей и топливной аппаратуры", rating: 4.9, reviews: 267 },
  
  // ===== АВТОЗАПЧАСТИ =====
  { id: 13, name: "АвтоДеталь", category: "automobiles", subcategory: "parts", region: "minsk", address: "Минск, ул. Долгобродская, 24", phone: "+375-17-345-67-89", website: "avtodetal.by", description: "Запчасти для легковых автомобилей всех марок", rating: 4.7, reviews: 445 },
  { id: 14, name: "Грузовые Запчасти БЕЛ", category: "automobiles", subcategory: "parts", region: "minsk", address: "Минск, ул. Казинца, 86", phone: "+375-29-123-45-67", description: "Запчасти для грузовых автомобилей МАЗ, КАМАЗ", rating: 4.5, reviews: 178 },
  { id: 15, name: "Автомир Брест", category: "automobiles", subcategory: "parts", region: "brest", address: "Брест, ул. Московская, 332", phone: "+375-162-45-67-89", description: "Автозапчасти оптом и в розницу", rating: 4.3, reviews: 156 },
  { id: 16, name: "Запчасти Плюс Гомель", category: "automobiles", subcategory: "parts", region: "gomel", address: "Гомель, ул. Барыкина, 150", phone: "+375-232-44-55-66", description: "Оригинальные и неоригинальные запчасти", rating: 4.6, reviews: 234 },
  { id: 17, name: "ВитАвтоЗап", category: "automobiles", subcategory: "parts", region: "vitebsk", address: "Витебск, пр. Строителей, 18", phone: "+375-212-33-22-11", description: "Запчасти для иномарок, доставка по области", rating: 4.4, reviews: 123 },
  
  // ===== ШИНОМОНТАЖ =====
  { id: 18, name: "ШинСервис 24", category: "automobiles", subcategory: "tires", region: "minsk", address: "Минск, ул. Тимирязева, 67", phone: "+375-29-888-77-66", description: "Круглосуточный шиномонтаж, хранение шин", rating: 4.8, reviews: 567 },
  { id: 19, name: "Колесо Брест", category: "automobiles", subcategory: "tires", region: "brest", address: "Брест, ул. Гоголя, 78", phone: "+375-162-55-44-33", description: "Шиномонтаж, балансировка, ремонт дисков", rating: 4.5, reviews: 234 },
  { id: 20, name: "ШинаГомель", category: "automobiles", subcategory: "tires", region: "gomel", address: "Гомель, ул. Советская, 136", phone: "+375-232-77-88-99", description: "Продажа и монтаж шин всех размеров", rating: 4.6, reviews: 189 },

  // ===== СТРОИТЕЛЬСТВО - КОМПАНИИ =====
  { id: 21, name: "СтройМинск ООО", category: "construction", subcategory: "companies", region: "minsk", address: "Минск, ул. Кальварийская, 25", phone: "+375-17-222-33-44", website: "stroyminsk.by", description: "Строительство жилых и коммерческих объектов под ключ", rating: 4.7, reviews: 234 },
  { id: 22, name: "БрестСтрой", category: "construction", subcategory: "companies", region: "brest", address: "Брест, ул. Ленина, 45", phone: "+375-162-22-33-44", description: "Строительные работы любой сложности", rating: 4.5, reviews: 156 },
  { id: 23, name: "ГомельЖилСтрой", category: "construction", subcategory: "companies", region: "gomel", address: "Гомель, пр. Ленина, 55", phone: "+375-232-33-44-55", website: "gzhs.by", description: "Строительство многоквартирных домов", rating: 4.6, reviews: 312 },
  { id: 24, name: "Витебскстрой", category: "construction", subcategory: "companies", region: "vitebsk", address: "Витебск, ул. Замковая, 20", phone: "+375-212-66-77-88", description: "Генеральный подрядчик строительства", rating: 4.4, reviews: 178 },
  { id: 25, name: "ГродноПромСтрой", category: "construction", subcategory: "companies", region: "grodno", address: "Гродно, ул. Советская, 18", phone: "+375-152-44-55-66", description: "Промышленное и гражданское строительство", rating: 4.5, reviews: 145 },
  { id: 26, name: "МогилёвСтройИнвест", category: "construction", subcategory: "companies", region: "mogilev", address: "Могилёв, ул. Первомайская, 75", phone: "+375-222-77-88-99", description: "Инвестиционное строительство", rating: 4.3, reviews: 89 },

  // ===== СТРОИТЕЛЬСТВО - МАТЕРИАЛЫ =====
  { id: 27, name: "СтройМатериалы БЕЛ", category: "construction", subcategory: "materials", region: "minsk", address: "Минск, ул. Казинца, 120", phone: "+375-17-345-67-89", website: "stroymaterial.by", description: "Оптовая продажа стройматериалов", rating: 4.8, reviews: 567 },
  { id: 28, name: "Керамин-Брест", category: "construction", subcategory: "materials", region: "brest", address: "Брест, ул. Московская, 275", phone: "+375-162-66-77-88", description: "Керамическая плитка, сантехника", rating: 4.6, reviews: 345 },
  { id: 29, name: "Стройбаза Гомель", category: "construction", subcategory: "materials", region: "gomel", address: "Гомель, ул. Барыкина, 200", phone: "+375-232-88-99-00", description: "Все для строительства и ремонта", rating: 4.5, reviews: 234 },

  // ===== СТРОИТЕЛЬСТВО - РЕМОНТ =====
  { id: 30, name: "РемонтПлюс", category: "construction", subcategory: "renovation", region: "minsk", address: "Минск, ул. Сурганова, 57А", phone: "+375-29-444-55-66", website: "remontplus.by", description: "Ремонт квартир под ключ", rating: 4.9, reviews: 456 },
  { id: 31, name: "ГомельРемонт", category: "construction", subcategory: "renovation", region: "gomel", address: "Гомель, пр. Ленина, 100", phone: "+375-232-44-55-66", description: "Ремонт квартир и офисов", rating: 4.6, reviews: 189 },
  { id: 32, name: "ЕвроРемонт Витебск", category: "construction", subcategory: "renovation", region: "vitebsk", address: "Витебск, ул. Ленина, 45", phone: "+375-212-55-66-77", description: "Качественный ремонт любой сложности", rating: 4.7, reviews: 167 },

  // ===== МЕДИЦИНА - КЛИНИКИ =====
  { id: 33, name: "МедЦентр Плюс", category: "medicine", subcategory: "clinics", region: "minsk", address: "Минск, ул. Сурганова, 47Б", phone: "+375-17-333-44-55", website: "medplus.by", description: "Многопрофильный медицинский центр", rating: 4.9, reviews: 678 },
  { id: 34, name: "Клиника Лодэ", category: "medicine", subcategory: "clinics", region: "minsk", address: "Минск, ул. Притыцкого, 140", phone: "+375-17-111-22-33", website: "lode.by", description: "Частная медицинская клиника", rating: 4.8, reviews: 1234 },
  { id: 35, name: "Медицинский центр Брест", category: "medicine", subcategory: "clinics", region: "brest", address: "Брест, ул. Советская, 67", phone: "+375-162-33-44-55", description: "Диагностика и лечение", rating: 4.6, reviews: 345 },
  { id: 36, name: "ГомельМед", category: "medicine", subcategory: "clinics", region: "gomel", address: "Гомель, ул. Советская, 45", phone: "+375-232-22-33-44", description: "Современный медицинский центр", rating: 4.7, reviews: 289 },
  { id: 37, name: "Витебский медцентр", category: "medicine", subcategory: "clinics", region: "vitebsk", address: "Витебск, пр. Фрунзе, 80", phone: "+375-212-44-55-66", description: "Широкий спектр медицинских услуг", rating: 4.5, reviews: 178 },

  // ===== МЕДИЦИНА - СТОМАТОЛОГИЯ =====
  { id: 38, name: "Стоматология 32", category: "medicine", subcategory: "dental", region: "minsk", address: "Минск, ул. Немига, 38", phone: "+375-17-222-32-32", website: "32zuba.by", description: "Современная стоматологическая клиника", rating: 4.9, reviews: 567 },
  { id: 39, name: "ДентаВита", category: "medicine", subcategory: "dental", region: "minsk", address: "Минск, ул. Скрыганова, 14", phone: "+375-29-333-22-11", description: "Имплантация, протезирование, лечение", rating: 4.8, reviews: 432 },
  { id: 40, name: "Стоматология Улыбка", category: "medicine", subcategory: "dental", region: "vitebsk", address: "Витебск, ул. Замковая, 12", phone: "+375-212-33-44-55", description: "Стоматологические услуги для всей семьи", rating: 4.7, reviews: 234 },
  { id: 41, name: "Дентал-Брест", category: "medicine", subcategory: "dental", region: "brest", address: "Брест, ул. Гоголя, 55", phone: "+375-162-77-88-99", description: "Лечение, протезирование, ортодонтия", rating: 4.6, reviews: 189 },

  // ===== МЕДИЦИНА - АПТЕКИ =====
  { id: 42, name: "Аптека Первая Помощь", category: "medicine", subcategory: "pharmacies", region: "minsk", address: "Минск, пр. Независимости, 58", phone: "+375-17-288-77-66", description: "Широкий ассортимент лекарств", rating: 4.5, reviews: 345 },
  { id: 43, name: "Аптека Здоровье", category: "medicine", subcategory: "pharmacies", region: "grodno", address: "Гродно, ул. Советская, 5", phone: "+375-152-77-88-99", description: "Лекарства и медицинские товары", rating: 4.4, reviews: 178 },
  { id: 44, name: "Фармация Гомель", category: "medicine", subcategory: "pharmacies", region: "gomel", address: "Гомель, ул. Советская, 97", phone: "+375-232-55-66-77", description: "Аптека с доставкой на дом", rating: 4.6, reviews: 234 },

  // ===== IT =====
  { id: 45, name: "IT Solutions", category: "it-telecom", subcategory: "software", region: "minsk", address: "Минск, ул. Купревича, 1/1", phone: "+375-29-777-88-99", website: "itsolutions.by", description: "Разработка программного обеспечения", rating: 4.8, reviews: 234 },
  { id: 46, name: "WebDev Гродно", category: "it-telecom", subcategory: "software", region: "grodno", address: "Гродно, ул. Горького, 87", phone: "+375-152-55-66-77", description: "Создание сайтов и веб-приложений", rating: 4.6, reviews: 145 },
  { id: 47, name: "SoftMinsk", category: "it-telecom", subcategory: "software", region: "minsk", address: "Минск, ул. Тимирязева, 72", phone: "+375-17-399-88-77", website: "softminsk.by", description: "Разработка мобильных приложений", rating: 4.7, reviews: 189 },
  { id: 48, name: "IT-Сервис Брест", category: "it-telecom", subcategory: "repair", region: "brest", address: "Брест, ул. Советская, 100", phone: "+375-162-88-99-00", description: "Ремонт компьютеров и ноутбуков", rating: 4.5, reviews: 267 },
  { id: 49, name: "КомпМастер", category: "it-telecom", subcategory: "repair", region: "minsk", address: "Минск, ул. Немига, 12", phone: "+375-29-111-22-33", description: "Срочный ремонт техники", rating: 4.6, reviews: 456 },

  // ===== ТОРГОВЛЯ =====
  { id: 50, name: "ЭлектроМир", category: "trade", subcategory: "electronics", region: "minsk", address: "Минск, пр. Независимости, 150", phone: "+375-17-444-55-66", website: "electromir.by", description: "Бытовая техника и электроника", rating: 4.5, reviews: 789 },
  { id: 51, name: "ТехноПлюс", category: "trade", subcategory: "electronics", region: "gomel", address: "Гомель, ул. Советская, 1", phone: "+375-232-99-88-77", description: "Компьютеры, телефоны, аксессуары", rating: 4.4, reviews: 345 },
  { id: 52, name: "Мебельный Дом", category: "trade", subcategory: "furniture", region: "mogilev", address: "Могилёв, ул. Первомайская, 25", phone: "+375-222-33-44-55", description: "Мебель для дома и офиса", rating: 4.3, reviews: 234 },
  { id: 53, name: "МебельГрад", category: "trade", subcategory: "furniture", region: "minsk", address: "Минск, ул. Уручская, 19", phone: "+375-17-555-66-77", website: "mebelgrad.by", description: "Мебель белорусских производителей", rating: 4.7, reviews: 456 },
  { id: 54, name: "Мода и Стиль", category: "trade", subcategory: "clothing", region: "minsk", address: "Минск, ул. Немига, 3", phone: "+375-17-222-33-44", description: "Брендовая одежда и обувь", rating: 4.6, reviews: 567 },
  { id: 55, name: "Одежда Брест", category: "trade", subcategory: "clothing", region: "brest", address: "Брест, ул. Советская, 65", phone: "+375-162-44-55-66", description: "Одежда для всей семьи", rating: 4.4, reviews: 234 },

  // ===== РЕСТОРАНЫ =====
  { id: 56, name: "Ресторан Минск", category: "restaurants", subcategory: "restaurants", region: "minsk", address: "Минск, пр. Победителей, 17", phone: "+375-17-555-66-77", website: "rest-minsk.by", description: "Белорусская и европейская кухня", rating: 4.8, reviews: 678 },
  { id: 57, name: "Камяница", category: "restaurants", subcategory: "restaurants", region: "minsk", address: "Минск, пл. Свободы, 3", phone: "+375-17-333-22-11", description: "Традиционная белорусская кухня", rating: 4.9, reviews: 892 },
  { id: 58, name: "Ресторан Брест", category: "restaurants", subcategory: "restaurants", region: "brest", address: "Брест, ул. Советская, 49", phone: "+375-162-22-33-44", description: "Европейская кухня, банкеты", rating: 4.6, reviews: 345 },
  { id: 59, name: "Кафе Уют", category: "restaurants", subcategory: "cafes", region: "brest", address: "Брест, ул. Советская, 50", phone: "+375-162-88-99-00", description: "Уютное кафе с домашней кухней", rating: 4.5, reviews: 234 },
  { id: 60, name: "Кофейня Гомель", category: "restaurants", subcategory: "cafes", region: "gomel", address: "Гомель, пр. Ленина, 18", phone: "+375-232-77-66-55", description: "Кофе, десерты, завтраки", rating: 4.7, reviews: 289 },
  { id: 61, name: "Пиццерия Италия", category: "restaurants", subcategory: "fastfood", region: "minsk", address: "Минск, ул. Сурганова, 27", phone: "+375-29-999-88-77", description: "Итальянская пицца, доставка", rating: 4.6, reviews: 567 },

  // ===== КРАСОТА =====
  { id: 62, name: "Салон Красоты Эстетика", category: "beauty", subcategory: "salons", region: "minsk", address: "Минск, ул. Немига, 40", phone: "+375-17-222-11-00", website: "estetika.by", description: "Полный спектр косметических услуг", rating: 4.9, reviews: 678 },
  { id: 63, name: "Студия Красоты Bravo", category: "beauty", subcategory: "salons", region: "minsk", address: "Минск, ул. Притыцкого, 83", phone: "+375-29-555-44-33", description: "Маникюр, педикюр, парикмахерские услуги", rating: 4.7, reviews: 456 },
  { id: 64, name: "Салон Виктория", category: "beauty", subcategory: "salons", region: "brest", address: "Брест, ул. Советская, 78", phone: "+375-162-99-88-77", description: "Стрижки, окрашивание, уход", rating: 4.6, reviews: 234 },
  { id: 65, name: "Фитнес-клуб Энергия", category: "beauty", subcategory: "fitness", region: "minsk", address: "Минск, ул. Притыцкого, 156", phone: "+375-17-366-55-44", website: "energia-fit.by", description: "Тренажерный зал, групповые занятия", rating: 4.8, reviews: 567 },
  { id: 66, name: "СПА-центр Релакс", category: "beauty", subcategory: "spa", region: "minsk", address: "Минск, ул. Сурганова, 5А", phone: "+375-17-288-99-00", description: "Массаж, сауна, косметология", rating: 4.9, reviews: 345 },
  { id: 67, name: "Барбершоп TOPGUN", category: "beauty", subcategory: "barbershops", region: "minsk", address: "Минск, ул. Зыбицкая, 6", phone: "+375-29-777-66-55", description: "Мужские стрижки и уход за бородой", rating: 4.8, reviews: 432 },

  // ===== УСЛУГИ =====
  { id: 68, name: "Юридическая фирма Право", category: "services", subcategory: "legal", region: "minsk", address: "Минск, пр. Независимости, 72", phone: "+375-17-399-88-77", website: "pravo.by", description: "Юридические консультации и представительство", rating: 4.7, reviews: 234 },
  { id: 69, name: "Адвокатское бюро Брест", category: "services", subcategory: "legal", region: "brest", address: "Брест, ул. Ленина, 31", phone: "+375-162-55-44-33", description: "Адвокатские услуги", rating: 4.5, reviews: 145 },
  { id: 70, name: "БухУчёт Сервис", category: "services", subcategory: "accounting", region: "minsk", address: "Минск, ул. Толбухина, 2", phone: "+375-17-277-66-55", description: "Бухгалтерские услуги для бизнеса", rating: 4.6, reviews: 189 },
  { id: 71, name: "Клининг Профи", category: "services", subcategory: "cleaning", region: "minsk", address: "Минск, ул. Казинца, 52", phone: "+375-29-888-99-00", website: "cleaningprofi.by", description: "Уборка квартир, офисов, коттеджей", rating: 4.8, reviews: 456 },

  // ===== ТРАНСПОРТ =====
  { id: 72, name: "БелГрузПеревозки", category: "transport", subcategory: "cargo", region: "minsk", address: "Минск, ул. Радиальная, 40А", phone: "+375-17-355-66-77", website: "belgruz.by", description: "Грузоперевозки по Беларуси и СНГ", rating: 4.6, reviews: 345 },
  { id: 73, name: "Такси Минск 135", category: "transport", subcategory: "taxi", region: "minsk", address: "Минск", phone: "+375-17-135", website: "taxi135.by", description: "Такси по Минску и области", rating: 4.5, reviews: 1234 },
  { id: 74, name: "АвтоПрокат", category: "transport", subcategory: "rental", region: "minsk", address: "Минск, ул. Притыцкого, 60", phone: "+375-29-666-77-88", description: "Аренда автомобилей без водителя", rating: 4.7, reviews: 289 },

  // ===== НЕДВИЖИМОСТЬ =====
  { id: 75, name: "Агентство Твой Дом", category: "realestate", subcategory: "agencies", region: "minsk", address: "Минск, пр. Независимости, 95", phone: "+375-17-288-77-66", website: "tvoydom.by", description: "Покупка, продажа, аренда недвижимости", rating: 4.6, reviews: 456 },
  { id: 76, name: "А-100 Девелопмент", category: "realestate", subcategory: "developers", region: "minsk", address: "Минск, ул. Кирова, 8", phone: "+375-17-399-00-11", website: "a-100.by", description: "Строительство жилых комплексов", rating: 4.8, reviews: 678 },
  { id: 77, name: "Аренда Офисов БЦ", category: "realestate", subcategory: "commercial", region: "minsk", address: "Минск, ул. Сурганова, 61", phone: "+375-17-266-55-44", description: "Коммерческая недвижимость", rating: 4.5, reviews: 178 },
];

export const regionMapping: { [key: string]: string[] } = {
  "minsk": ["minsk", "minsk-region"],
  "minsk-region": ["minsk", "minsk-region"],
  "brest": ["brest"],
  "vitebsk": ["vitebsk"],
  "gomel": ["gomel"],
  "grodno": ["grodno"],
  "mogilev": ["mogilev"],
};

export const businessCategories: Category[] = [
  { name: "Автомобили", slug: "automobiles", icon: "🚗", description: "Автосалоны, автосервисы, запчасти", subcategories: [
    { name: "Автосалоны", slug: "dealers", count: 156 },
    { name: "Автосервис", slug: "service", count: 423 },
    { name: "Автозапчасти", slug: "parts", count: 312 },
    { name: "Шиномонтаж", slug: "tires", count: 89 },
  ]},
  { name: "Строительство", slug: "construction", icon: "🏗️", description: "Строительные компании и материалы", subcategories: [
    { name: "Строительные компании", slug: "companies", count: 234 },
    { name: "Стройматериалы", slug: "materials", count: 567 },
    { name: "Ремонт и отделка", slug: "renovation", count: 345 },
    { name: "Проектирование", slug: "design", count: 123 },
  ]},
  { name: "Медицина", slug: "medicine", icon: "🏥", description: "Клиники, аптеки, медицинские услуги", subcategories: [
    { name: "Клиники", slug: "clinics", count: 189 },
    { name: "Аптеки", slug: "pharmacies", count: 456 },
    { name: "Стоматология", slug: "dental", count: 234 },
    { name: "Диагностика", slug: "diagnostics", count: 78 },
  ]},
  { name: "Образование", slug: "education", icon: "🎓", description: "Учебные заведения, курсы", subcategories: [
    { name: "Университеты", slug: "universities", count: 45 },
    { name: "Курсы", slug: "courses", count: 312 },
    { name: "Детские сады", slug: "kindergartens", count: 178 },
    { name: "Школы", slug: "schools", count: 234 },
  ]},
  { name: "Финансы", slug: "finance", icon: "💰", description: "Банки, страхование, инвестиции", subcategories: [
    { name: "Банки", slug: "banks", count: 67 },
    { name: "Страхование", slug: "insurance", count: 123 },
    { name: "Кредитование", slug: "loans", count: 89 },
    { name: "Обмен валют", slug: "exchange", count: 234 },
  ]},
  { name: "IT и Телеком", slug: "it-telecom", icon: "💻", description: "IT-компании, связь, интернет", subcategories: [
    { name: "IT-компании", slug: "it-companies", count: 456 },
    { name: "Интернет-провайдеры", slug: "isp", count: 34 },
    { name: "Разработка ПО", slug: "software", count: 312 },
    { name: "Ремонт техники", slug: "repair", count: 189 },
  ]},
  { name: "Торговля", slug: "trade", icon: "🛒", description: "Магазины, оптовая торговля", subcategories: [
    { name: "Продукты питания", slug: "food", count: 567 },
    { name: "Одежда и обувь", slug: "clothing", count: 345 },
    { name: "Электроника", slug: "electronics", count: 234 },
    { name: "Мебель", slug: "furniture", count: 178 },
  ]},
  { name: "Услуги", slug: "services", icon: "🔧", description: "Бытовые и профессиональные услуги", subcategories: [
    { name: "Юридические услуги", slug: "legal", count: 234 },
    { name: "Бухгалтерия", slug: "accounting", count: 189 },
    { name: "Клининг", slug: "cleaning", count: 123 },
    { name: "Переводы", slug: "translation", count: 67 },
  ]},
  { name: "Транспорт", slug: "transport", icon: "🚚", description: "Грузоперевозки, логистика, такси", subcategories: [
    { name: "Грузоперевозки", slug: "cargo", count: 345 },
    { name: "Такси", slug: "taxi", count: 89 },
    { name: "Аренда авто", slug: "rental", count: 56 },
    { name: "Логистика", slug: "logistics", count: 123 },
  ]},
  { name: "Недвижимость", slug: "realestate", icon: "🏠", description: "Агентства, застройщики", subcategories: [
    { name: "Агентства", slug: "agencies", count: 234 },
    { name: "Застройщики", slug: "developers", count: 89 },
    { name: "Аренда", slug: "rent", count: 456 },
    { name: "Коммерческая", slug: "commercial", count: 178 },
  ]},
  { name: "Рестораны и кафе", slug: "restaurants", icon: "🍽️", description: "Общественное питание", subcategories: [
    { name: "Рестораны", slug: "restaurants", count: 312 },
    { name: "Кафе", slug: "cafes", count: 456 },
    { name: "Фастфуд", slug: "fastfood", count: 178 },
    { name: "Доставка еды", slug: "delivery", count: 89 },
  ]},
  { name: "Красота и здоровье", slug: "beauty", icon: "💅", description: "Салоны красоты, фитнес, спа", subcategories: [
    { name: "Салоны красоты", slug: "salons", count: 345 },
    { name: "Фитнес-клубы", slug: "fitness", count: 123 },
    { name: "СПА", slug: "spa", count: 67 },
    { name: "Барбершопы", slug: "barbershops", count: 89 },
  ]},
];

export const regions = [
  { name: "Минск", slug: "minsk", count: 4567 },
  { name: "Минская область", slug: "minsk-region", count: 1234 },
  { name: "Брестская область", slug: "brest", count: 789 },
  { name: "Витебская область", slug: "vitebsk", count: 654 },
  { name: "Гомельская область", slug: "gomel", count: 876 },
  { name: "Гродненская область", slug: "grodno", count: 543 },
  { name: "Могилёвская область", slug: "mogilev", count: 432 },
];

export const featuredCompanies = [
  { id: 1, name: "24pds ПроДизельСервис", category: "Автомобили", rating: 4.8, reviews: 156, description: "Ремонт автоэлектрики и ТНВД" },
  { id: 21, name: "СтройМинск", category: "Строительство", rating: 4.7, reviews: 234, description: "Строительство под ключ" },
  { id: 33, name: "МедЦентр Плюс", category: "Медицина", rating: 4.9, reviews: 678, description: "Многопрофильный медцентр" },
  { id: 45, name: "IT Solutions", category: "IT и Телеком", rating: 4.8, reviews: 234, description: "Разработка ПО" },
];
