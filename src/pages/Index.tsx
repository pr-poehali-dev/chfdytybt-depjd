import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog";

interface University {
  id: number;
  name: string;
  short: string;
  city: string;
  region: string;
  rating: number;
  nationalRank: number;
  students: number;
  directions: string[];
  tuition: number;
  budget: boolean;
  accent: string;
  accentBg: string;
  emoji: string;
  tags: string[];
  mood: string;
}

interface CatalogPageProps {
  universities: University[];
  search: string;
  setSearch: (v: string) => void;
  regionFilter: string;
  setRegionFilter: (v: string) => void;
  directionFilter: string;
  setDirectionFilter: (v: string) => void;
  ratingFilter: string;
  setRatingFilter: (v: string) => void;
}

const UNIVERSITIES: University[] = [
  {
    id: 1, name: "МГУ им. М.В. Ломоносова", short: "МГУ",
    city: "Москва", region: "Москва", rating: 9.8, nationalRank: 1,
    students: 47000, directions: ["Технические", "Гуманитарные", "Естественные", "Медицинские"],
    tuition: 280000, budget: true,
    accent: "#c06fa0", accentBg: "#fdf0f7", emoji: "🏛️",
    tags: ["Флагман", "Исследования"], mood: "Классика и престиж",
  },
  {
    id: 2, name: "МФТИ — Физтех", short: "МФТИ",
    city: "Долгопрудный", region: "Москва", rating: 9.6, nationalRank: 2,
    students: 6500, directions: ["Технические", "IT", "Физика"],
    tuition: 350000, budget: true,
    accent: "#7b9fd4", accentBg: "#f0f4fd", emoji: "⚡",
    tags: ["IT", "Наука"], mood: "Для влюблённых в физику",
  },
  {
    id: 3, name: "НИУ Высшая школа экономики", short: "ВШЭ",
    city: "Москва", region: "Москва", rating: 9.4, nationalRank: 3,
    students: 40000, directions: ["Экономические", "Гуманитарные", "IT", "Юридические"],
    tuition: 400000, budget: true,
    accent: "#c09060", accentBg: "#fdf6ee", emoji: "📊",
    tags: ["Бизнес", "Экономика"], mood: "Амбиции и карьера",
  },
  {
    id: 4, name: "МГТУ им. Баумана", short: "Бауманка",
    city: "Москва", region: "Москва", rating: 9.2, nationalRank: 4,
    students: 22000, directions: ["Технические", "IT", "Машиностроение"],
    tuition: 230000, budget: true,
    accent: "#7ab89a", accentBg: "#eef8f2", emoji: "🔧",
    tags: ["Инженерия", "Технологии"], mood: "Создаёшь, а не говоришь",
  },
  {
    id: 5, name: "СПбГУ", short: "СПбГУ",
    city: "Санкт-Петербург", region: "Санкт-Петербург", rating: 9.1, nationalRank: 5,
    students: 30000, directions: ["Гуманитарные", "Юридические", "Естественные"],
    tuition: 260000, budget: true,
    accent: "#9b8bc0", accentBg: "#f4f0fc", emoji: "🌊",
    tags: ["Классика", "Наука"], mood: "Атмосфера и глубина",
  },
  {
    id: 6, name: "ИТМО", short: "ИТМО",
    city: "Санкт-Петербург", region: "Санкт-Петербург", rating: 9.0, nationalRank: 6,
    students: 16000, directions: ["IT", "Технические", "Фотоника"],
    tuition: 300000, budget: true,
    accent: "#6ab3c8", accentBg: "#eef7fb", emoji: "💡",
    tags: ["IT", "Инновации"], mood: "Будущее строится здесь",
  },
  {
    id: 7, name: "Уральский федеральный университет", short: "УрФУ",
    city: "Екатеринбург", region: "Урал", rating: 8.5, nationalRank: 12,
    students: 35000, directions: ["Технические", "Гуманитарные", "Экономические"],
    tuition: 180000, budget: true,
    accent: "#d4907a", accentBg: "#fdf2ee", emoji: "⛰️",
    tags: ["Регионы", "Доступность"], mood: "Сила и характер Урала",
  },
  {
    id: 8, name: "Новосибирский государственный университет", short: "НГУ",
    city: "Новосибирск", region: "Сибирь", rating: 8.9, nationalRank: 8,
    students: 8000, directions: ["Естественные", "Физика", "IT"],
    tuition: 200000, budget: true,
    accent: "#7ab89a", accentBg: "#eef8f2", emoji: "🔬",
    tags: ["Наука", "Академгородок"], mood: "Настоящая наука в тайге",
  },
  {
    id: 9, name: "Казанский федеральный университет", short: "КФУ",
    city: "Казань", region: "Поволжье", rating: 8.3, nationalRank: 15,
    students: 50000, directions: ["Гуманитарные", "Медицинские", "Технические"],
    tuition: 160000, budget: true,
    accent: "#c08080", accentBg: "#fdf0f0", emoji: "🕌",
    tags: ["Многопрофильный"], mood: "Восток и Запад вместе",
  },
  {
    id: 10, name: "Дальневосточный федеральный университет", short: "ДВФУ",
    city: "Владивосток", region: "Дальний Восток", rating: 7.8, nationalRank: 22,
    students: 20000, directions: ["Морские", "Технические", "Гуманитарные"],
    tuition: 150000, budget: true,
    accent: "#6ab3c8", accentBg: "#eef7fb", emoji: "🌏",
    tags: ["АТР", "Уникальный"], mood: "Край земли, начало пути",
  },
  {
    id: 11, name: "РАНХиГС", short: "РАНХиГС",
    city: "Москва", region: "Москва", rating: 8.0, nationalRank: 18,
    students: 57000, directions: ["Экономические", "Управление", "Юридические"],
    tuition: 320000, budget: false,
    accent: "#c09060", accentBg: "#fdf6ee", emoji: "🏛",
    tags: ["Госуправление"], mood: "Для будущих руководителей",
  },
  {
    id: 12, name: "Томский политехнический университет", short: "ТПУ",
    city: "Томск", region: "Сибирь", rating: 8.6, nationalRank: 10,
    students: 15000, directions: ["Технические", "Энергетика", "IT"],
    tuition: 170000, budget: true,
    accent: "#9b8bc0", accentBg: "#f4f0fc", emoji: "⚙️",
    tags: ["Инженерия", "Сибирь"], mood: "Инженерное сердце Сибири",
  },
];

const REGIONS = ["Все", "Москва", "Санкт-Петербург", "Урал", "Сибирь", "Поволжье", "Дальний Восток"];
const DIRECTIONS = ["Все", "IT", "Технические", "Гуманитарные", "Экономические", "Медицинские", "Естественные", "Юридические"];
const RATINGS = ["Все", "9+", "8.5+", "8+"];


export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("Все");
  const [directionFilter, setDirectionFilter] = useState("Все");
  const [ratingFilter, setRatingFilter] = useState("Все");

  const filtered = UNIVERSITIES.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.short.toLowerCase().includes(q);
    const matchRegion = regionFilter === "Все" || u.region === regionFilter;
    const matchDir = directionFilter === "Все" || u.directions.includes(directionFilter);
    const matchRating =
      ratingFilter === "Все" ||
      (ratingFilter === "9+" && u.rating >= 9) ||
      (ratingFilter === "8.5+" && u.rating >= 8.5) ||
      (ratingFilter === "8+" && u.rating >= 8);
    return matchSearch && matchRegion && matchDir && matchRating;
  });

  return (
    <div className="min-h-screen font-golos" style={{ background: "hsl(var(--background))" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: "rgba(253, 248, 252, 0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(210, 180, 225, 0.3)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => setPage("home")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background: "linear-gradient(135deg, #f4a7c3, #c9b8e8)" }}>
              🌸
            </div>
            <span className="font-cormorant text-xl font-bold" style={{ color: "#7a4a6a", letterSpacing: "0.02em" }}>
              ВузГид
            </span>
          </button>
          <div className="flex items-center gap-1">
            <NavBtn active={page === "home"} onClick={() => setPage("home")} label="Главная" />
            <NavBtn active={page === "catalog"} onClick={() => setPage("catalog")} label="Каталог" />
          </div>
        </div>
      </nav>

      {page === "home" && <HomePage onCatalog={() => setPage("catalog")} />}
      {page === "catalog" && (
        <CatalogPage
          universities={filtered}
          search={search} setSearch={setSearch}
          regionFilter={regionFilter} setRegionFilter={setRegionFilter}
          directionFilter={directionFilter} setDirectionFilter={setDirectionFilter}
          ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}
        />
      )}
    </div>
  );
}

function NavBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
      style={{
        background: active ? "rgba(192, 111, 160, 0.12)" : "transparent",
        color: active ? "#c06fa0" : "#9a7a94",
        border: active ? "1px solid rgba(192,111,160,0.3)" : "1px solid transparent",
      }}
    >
      {label}
    </button>
  );
}

function HomePage({ onCatalog }: { onCatalog: () => void }) {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-28 px-6">
        <div className="absolute -top-20 -right-24 w-96 h-96 blob-morph opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle, #f4c8dc, #e8d5f0)" }} />
        <div className="absolute -bottom-16 -left-20 w-80 h-80 blob-morph opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #c9dff4, #d5e8e0)", animationDelay: "3s" }} />

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-7 animate-fade-in"
                style={{ background: "rgba(192,111,160,0.1)", color: "#c06fa0", border: "1px solid rgba(192,111,160,0.2)" }}
              >
                <span>📖</span> Личный проект одиннадцатиклассницы
              </div>

              <h1 className="font-cormorant text-5xl md:text-6xl font-bold leading-tight mb-5 animate-slide-up" style={{ color: "#3d2550", animationDelay: "0.1s" }}>
                Каждый выбирает вуз.{" "}
                <span className="text-gradient-rose italic">Я сделала это сайтом</span>
              </h1>

              <p className="text-base leading-relaxed mb-4 animate-slide-up" style={{ color: "#8a6a84", animationDelay: "0.2s", animationFillMode: "forwards" }}>
                11-й класс — и передо мной тот же вопрос, что и перед сотнями тысяч выпускников: <span style={{ color: "#3d2550", fontWeight: 600 }}>куда поступать?</span>
              </p>
              <p className="text-base leading-relaxed mb-8 animate-slide-up" style={{ color: "#8a6a84", animationDelay: "0.25s", animationFillMode: "forwards" }}>
                Вместо того чтобы часами листать сайты — я собрала всё в одном месте. Каталог вузов с фильтрами по региону, направлению и рейтингу. Для себя и для таких же, как я.
              </p>

              <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
                <button
                  onClick={onCatalog}
                  className="px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #c96fa0, #9b70c8)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(192,111,160,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  Смотреть каталог →
                </button>
              </div>
            </div>

            {/* Floating note card */}
            <div className="hidden md:flex justify-center">
              <div className="relative animate-float">
                <div className="card-soft rounded-3xl p-7 w-72" style={{ boxShadow: "0 12px 40px rgba(180,140,200,0.2)" }}>
                  <div className="text-3xl mb-4">✍️</div>
                  <div className="font-cormorant text-xl font-bold mb-3" style={{ color: "#3d2550" }}>
                    «Выбор вуза — это не страшно»
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#9a7a8a" }}>
                    Главное — знать свои приоритеты и иметь удобный инструмент рядом.
                  </p>
                  <div className="flex items-center gap-2.5 pt-3" style={{ borderTop: "1px solid rgba(210,180,225,0.3)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg, #f4a7c3, #c9b8e8)" }}>🙋‍♀️</div>
                    <div>
                      <div className="text-xs font-semibold" style={{ color: "#3d2550" }}>Автор сайта</div>
                      <div className="text-xs" style={{ color: "#b89ab0" }}>11-й класс, 2025</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, #f4a7c3, #c9b8e8)", boxShadow: "0 4px 16px rgba(180,140,200,0.3)" }}>✨</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS SITE */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-10 md:p-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #fdf0f7, #f4f0fc)" }}
          >
            <div className="absolute top-0 right-0 text-8xl opacity-10 select-none" style={{ lineHeight: 1 }}>🎓</div>
            <div className="max-w-xl relative">
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#c06fa0" }}>Зачем этот сайт?</div>
              <h2 className="font-cormorant text-3xl md:text-4xl font-bold mb-5 leading-snug" style={{ color: "#3d2550" }}>
                Когда гуглишь вузы — информация везде, а ясности ноль
              </h2>
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#8a6a84" }}>
                <p>Официальные сайты вузов перегружены. Рейтинги разбросаны по разным источникам. Советы взрослых — субъективны. А времени до подачи документов всё меньше.</p>
                <p>Я создала этот сайт как <span style={{ color: "#3d2550", fontWeight: 600 }}>простой и честный каталог</span> — чтобы можно было быстро отфильтровать вузы по тому, что важно именно тебе: город, направление, рейтинг.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP PICKS */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-cormorant text-4xl font-bold mb-1" style={{ color: "#3d2550" }}>
                Топ вузов <span className="text-gradient-rose italic">России</span>
              </h2>
              <p className="text-sm" style={{ color: "#9a7a8a" }}>Национальный рейтинг 2025</p>
            </div>
            <button onClick={onCatalog} className="text-sm font-medium pb-0.5" style={{ color: "#c06fa0", borderBottom: "1px solid rgba(192,111,160,0.4)" }}>
              Все вузы →
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {UNIVERSITIES.slice(0, 6).map((u) => (
              <UniversityCard key={u.id} u={u} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fce8f3, #ede8fc, #e8f4fc)" }}
        >
          <div className="absolute top-4 left-8 text-3xl opacity-40 animate-float" style={{ animationDelay: "0s" }}>🌸</div>
          <div className="absolute top-8 right-12 text-2xl opacity-30 animate-float" style={{ animationDelay: "1.5s" }}>✨</div>
          <div className="absolute bottom-6 left-16 text-2xl opacity-25 animate-float" style={{ animationDelay: "3s" }}>🌷</div>
          <div className="absolute bottom-4 right-8 text-3xl opacity-35 animate-float" style={{ animationDelay: "2s" }}>🎓</div>
          <h2 className="font-cormorant text-4xl font-bold mb-3 relative" style={{ color: "#3d2550" }}>
            Найди свой вуз здесь
          </h2>
          <p className="text-sm mb-8 relative" style={{ color: "#8a6a84" }}>
            Фильтруй по региону, направлению и рейтингу — без лишних вкладок
          </p>
          <button
            onClick={onCatalog}
            className="px-9 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 relative"
            style={{ background: "linear-gradient(135deg, #c96fa0, #9b70c8)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(192,111,160,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            Открыть каталог 🌸
          </button>
        </div>
      </section>

      <footer className="border-t py-8 px-6 text-center text-sm" style={{ borderColor: "rgba(210,180,225,0.3)", color: "#b89ab0" }}>
        <span className="font-cormorant font-bold text-base" style={{ color: "#7a4a6a" }}>ВузГид</span> — личный проект 11-классницы © 2025
      </footer>
    </div>
  );
}

function CatalogPage({
  universities, search, setSearch,
  regionFilter, setRegionFilter,
  directionFilter, setDirectionFilter,
  ratingFilter, setRatingFilter,
}: CatalogPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="font-cormorant text-5xl font-bold mb-2" style={{ color: "#3d2550" }}>
          Каталог <span className="text-gradient-rose italic">вузов</span>
        </h1>
        <p className="text-sm" style={{ color: "#9a7a8a" }}>
          Найдено: <span className="font-semibold" style={{ color: "#3d2550" }}>{universities.length}</span> вузов
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Icon name="Search" size={17} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#b89ab0" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Найти по названию или городу..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
          style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(210,180,225,0.4)", color: "#3d2550", caretColor: "#c06fa0" }}
          onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(192,111,160,0.6)")}
          onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(210,180,225,0.4)")}
        />
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-8">
        <FilterRow label="Регион" options={REGIONS} value={regionFilter} onChange={setRegionFilter} />
        <FilterRow label="Направление" options={DIRECTIONS} value={directionFilter} onChange={setDirectionFilter} />
        <FilterRow label="Рейтинг" options={RATINGS} value={ratingFilter} onChange={setRatingFilter} />
      </div>

      {universities.length === 0 ? (
        <div className="text-center py-24" style={{ color: "#b89ab0" }}>
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-base">Вузы не найдены — попробуй другие фильтры</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {universities.map((u: University) => (
            <UniversityCard key={u.id} u={u} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs w-20 shrink-0" style={{ color: "#b89ab0" }}>{label}:</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{
              background: value === opt ? "rgba(192,111,160,0.15)" : "rgba(255,255,255,0.7)",
              border: `1px solid ${value === opt ? "rgba(192,111,160,0.45)" : "rgba(210,180,225,0.4)"}`,
              color: value === opt ? "#c06fa0" : "#9a7a94",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function UniversityCard({ u }: { u: University }) {
  const ratingColor = u.rating >= 9.5 ? "#c06fa0" : u.rating >= 9 ? "#7b9fd4" : u.rating >= 8.5 ? "#7ab89a" : "#c09060";

  return (
    <div
      className="rounded-2xl p-5 cursor-pointer transition-all duration-300 flex flex-col gap-3.5"
      style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(12px)", border: "1px solid rgba(210,180,225,0.3)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = `1px solid ${u.accent}45`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 32px ${u.accent}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(210,180,225,0.3)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: u.accentBg }}>
            {u.emoji}
          </div>
          <div>
            <div className="font-cormorant font-bold text-lg leading-tight" style={{ color: "#3d2550" }}>{u.short}</div>
            <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "#b89ab0" }}>
              <Icon name="MapPin" size={10} style={{ color: "#b89ab0" }} /> {u.city}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-cormorant text-2xl font-bold leading-none" style={{ color: ratingColor }}>{u.rating}</div>
          <div className="text-xs mt-0.5" style={{ color: "#b89ab0" }}>#{u.nationalRank} в РФ</div>
        </div>
      </div>

      {/* Mood */}
      <div className="text-xs italic leading-relaxed" style={{ color: u.accent }}>«{u.mood}»</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {u.tags.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: u.accentBg, color: u.accent }}>
            {t}
          </span>
        ))}
        {u.budget && (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#eef8f2", color: "#7ab89a" }}>
            Бюджет
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between pt-2.5" style={{ borderTop: "1px solid rgba(210,180,225,0.25)" }}>
        <div className="flex items-center gap-1 text-xs" style={{ color: "#b89ab0" }}>
          <Icon name="Users" size={11} style={{ color: "#b89ab0" }} />
          {(u.students / 1000).toFixed(0)}к студентов
        </div>
        <div className="text-xs font-semibold" style={{ color: u.accent }}>
          от {(u.tuition / 1000).toFixed(0)}к ₽/год
        </div>
      </div>

      {/* Directions */}
      <div className="flex flex-wrap gap-1">
        {u.directions.slice(0, 3).map((d) => (
          <span key={d} className="px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(240,235,248,0.7)", color: "#9a7a94" }}>
            {d}
          </span>
        ))}
        {u.directions.length > 3 && (
          <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(240,235,248,0.7)", color: "#b89ab0" }}>
            +{u.directions.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}