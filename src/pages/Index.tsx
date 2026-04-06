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
  color: string;
  emoji: string;
  tags: string[];
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
    id: 1,
    name: "МГУ им. М.В. Ломоносова",
    short: "МГУ",
    city: "Москва",
    region: "Москва",
    rating: 9.8,
    nationalRank: 1,
    students: 47000,
    directions: ["Технические", "Гуманитарные", "Естественные", "Медицинские"],
    tuition: 280000,
    budget: true,
    color: "#a855f7",
    emoji: "🏛️",
    tags: ["Флагман", "Исследования"],
  },
  {
    id: 2,
    name: "МФТИ — Физтех",
    short: "МФТИ",
    city: "Долгопрудный",
    region: "Москва",
    rating: 9.6,
    nationalRank: 2,
    students: 6500,
    directions: ["Технические", "IT", "Физика"],
    tuition: 350000,
    budget: true,
    color: "#00d4ff",
    emoji: "⚡",
    tags: ["IT", "Наука"],
  },
  {
    id: 3,
    name: "НИУ Высшая школа экономики",
    short: "ВШЭ",
    city: "Москва",
    region: "Москва",
    rating: 9.4,
    nationalRank: 3,
    students: 40000,
    directions: ["Экономические", "Гуманитарные", "IT", "Юридические"],
    tuition: 400000,
    budget: true,
    color: "#f72585",
    emoji: "📊",
    tags: ["Бизнес", "Экономика"],
  },
  {
    id: 4,
    name: "МГТУ им. Баумана",
    short: "Бауманка",
    city: "Москва",
    region: "Москва",
    rating: 9.2,
    nationalRank: 4,
    students: 22000,
    directions: ["Технические", "IT", "Машиностроение"],
    tuition: 230000,
    budget: true,
    color: "#39ff14",
    emoji: "🔧",
    tags: ["Инженерия", "Технологии"],
  },
  {
    id: 5,
    name: "СПбГУ",
    short: "СПбГУ",
    city: "Санкт-Петербург",
    region: "Санкт-Петербург",
    rating: 9.1,
    nationalRank: 5,
    students: 30000,
    directions: ["Гуманитарные", "Юридические", "Естественные"],
    tuition: 260000,
    budget: true,
    color: "#a855f7",
    emoji: "🌊",
    tags: ["Классика", "Наука"],
  },
  {
    id: 6,
    name: "ИТМО",
    short: "ИТМО",
    city: "Санкт-Петербург",
    region: "Санкт-Петербург",
    rating: 9.0,
    nationalRank: 6,
    students: 16000,
    directions: ["IT", "Технические", "Фотоника"],
    tuition: 300000,
    budget: true,
    color: "#00d4ff",
    emoji: "💡",
    tags: ["IT", "Инновации"],
  },
  {
    id: 7,
    name: "Уральский федеральный университет",
    short: "УрФУ",
    city: "Екатеринбург",
    region: "Урал",
    rating: 8.5,
    nationalRank: 12,
    students: 35000,
    directions: ["Технические", "Гуманитарные", "Экономические"],
    tuition: 180000,
    budget: true,
    color: "#f72585",
    emoji: "⛰️",
    tags: ["Регионы", "Доступность"],
  },
  {
    id: 8,
    name: "Новосибирский государственный университет",
    short: "НГУ",
    city: "Новосибирск",
    region: "Сибирь",
    rating: 8.9,
    nationalRank: 8,
    students: 8000,
    directions: ["Естественные", "Физика", "IT"],
    tuition: 200000,
    budget: true,
    color: "#39ff14",
    emoji: "🔬",
    tags: ["Наука", "Академгородок"],
  },
  {
    id: 9,
    name: "Казанский федеральный университет",
    short: "КФУ",
    city: "Казань",
    region: "Поволжье",
    rating: 8.3,
    nationalRank: 15,
    students: 50000,
    directions: ["Гуманитарные", "Медицинские", "Технические"],
    tuition: 160000,
    budget: true,
    color: "#a855f7",
    emoji: "🕌",
    tags: ["Многопрофильный"],
  },
  {
    id: 10,
    name: "Дальневосточный федеральный университет",
    short: "ДВФУ",
    city: "Владивосток",
    region: "Дальний Восток",
    rating: 7.8,
    nationalRank: 22,
    students: 20000,
    directions: ["Морские", "Технические", "Гуманитарные"],
    tuition: 150000,
    budget: true,
    color: "#00d4ff",
    emoji: "🌏",
    tags: ["АТР", "Уникальный"],
  },
  {
    id: 11,
    name: "РАНХиГС",
    short: "РАНХиГС",
    city: "Москва",
    region: "Москва",
    rating: 8.0,
    nationalRank: 18,
    students: 57000,
    directions: ["Экономические", "Управление", "Юридические"],
    tuition: 320000,
    budget: false,
    color: "#f72585",
    emoji: "🏛",
    tags: ["Госуправление"],
  },
  {
    id: 12,
    name: "Томский политехнический университет",
    short: "ТПУ",
    city: "Томск",
    region: "Сибирь",
    rating: 8.6,
    nationalRank: 10,
    students: 15000,
    directions: ["Технические", "Энергетика", "IT"],
    tuition: 170000,
    budget: true,
    color: "#39ff14",
    emoji: "⚙️",
    tags: ["Инженерия", "Сибирь"],
  },
];

const REGIONS = ["Все", "Москва", "Санкт-Петербург", "Урал", "Сибирь", "Поволжье", "Дальний Восток"];
const DIRECTIONS = ["Все", "IT", "Технические", "Гуманитарные", "Экономические", "Медицинские", "Естественные", "Юридические"];
const RATINGS = ["Все", "9+", "8.5+", "8+"];

const STATS = [
  { value: "800+", label: "Вузов в базе", icon: "GraduationCap", color: "#a855f7" },
  { value: "50+", label: "Регионов России", icon: "MapPin", color: "#00d4ff" },
  { value: "200+", label: "Направлений", icon: "BookOpen", color: "#f72585" },
  { value: "2М+", label: "Абитуриентов", icon: "Users", color: "#39ff14" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("Все");
  const [directionFilter, setDirectionFilter] = useState("Все");
  const [ratingFilter, setRatingFilter] = useState("Все");

  const filtered = UNIVERSITIES.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      u.short.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === "Все" || u.region === regionFilter;
    const matchDirection = directionFilter === "Все" || u.directions.includes(directionFilter);
    const matchRating =
      ratingFilter === "Все" ||
      (ratingFilter === "9+" && u.rating >= 9) ||
      (ratingFilter === "8.5+" && u.rating >= 8.5) ||
      (ratingFilter === "8+" && u.rating >= 8);
    return matchSearch && matchRegion && matchDirection && matchRating;
  });

  return (
    <div className="min-h-screen bg-background font-golos">
      <nav
        className="sticky top-0 z-50 border-b border-border/50"
        style={{ background: "rgba(10, 12, 18, 0.88)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => setPage("home")} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "linear-gradient(135deg, #a855f7, #00d4ff)" }}
            >
              🎓
            </div>
            <span className="font-oswald text-xl font-bold tracking-wide text-white">
              ВУЗ<span style={{ color: "#a855f7" }}>ГИД</span>
            </span>
          </button>
          <div className="flex items-center gap-1">
            <NavBtn active={page === "home"} onClick={() => setPage("home")} label="Главная" />
            <NavBtn active={page === "catalog"} onClick={() => setPage("catalog")} label="Каталог вузов" />
          </div>
        </div>
      </nav>

      {page === "home" && <HomePage onCatalog={() => setPage("catalog")} />}
      {page === "catalog" && (
        <CatalogPage
          universities={filtered}
          search={search}
          setSearch={setSearch}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          directionFilter={directionFilter}
          setDirectionFilter={setDirectionFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />
      )}
    </div>
  );
}

function NavBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      style={{
        background: active ? "rgba(168, 85, 247, 0.15)" : "transparent",
        color: active ? "#a855f7" : "rgba(255,255,255,0.6)",
        border: active ? "1px solid rgba(168, 85, 247, 0.3)" : "1px solid transparent",
      }}
    >
      {label}
    </button>
  );
}

function HomePage({ onCatalog }: { onCatalog: () => void }) {
  return (
    <div>
      <section className="relative overflow-hidden pt-24 pb-32 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-1/2 w-80 h-40 opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #f72585, transparent)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 animate-fade-in"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", color: "#a855f7" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse-neon" style={{ background: "#a855f7" }} />
            Лучшая платформа сравнения вузов 2025
          </div>

          <h1
            className="font-oswald text-6xl md:text-8xl font-bold leading-none mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
          >
            НАЙДИ СВОЙ
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ИДЕАЛЬНЫЙ ВУЗ
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
          >
            Сравнивай вузы по рейтингам, стоимости обучения и направлениям. Принимай решение на основе данных, а не слухов.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
          >
            <button
              onClick={onCatalog}
              className="px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(168,85,247,0.5)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Перейти к каталогу →
            </button>
            <button
              className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Как сравнивать?
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 text-center transition-all duration-300 cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${s.color}30`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${s.color}18` }}
              >
                <Icon name={s.icon} size={22} style={{ color: s.color }} />
              </div>
              <div className="font-oswald text-3xl font-bold mb-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-1">Топ вузов России</h2>
              <p className="text-muted-foreground text-sm">По национальному рейтингу 2025</p>
            </div>
            <button
              onClick={onCatalog}
              className="text-sm font-medium transition-colors"
              style={{ color: "#a855f7" }}
            >
              Все вузы →
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {UNIVERSITIES.slice(0, 6).map((u, i) => (
              <UniversityCard key={u.id} u={u} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div
          className="max-w-3xl mx-auto text-center rounded-3xl p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(0,212,255,0.08))",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 70% 30%, rgba(168,85,247,0.15), transparent 60%)" }}
          />
          <h2 className="font-oswald text-4xl font-bold text-white mb-4 relative">Начни сравнение сейчас</h2>
          <p className="text-muted-foreground mb-8 relative">
            Фильтруй по региону, направлению и рейтингу — найди вуз мечты за 2 минуты
          </p>
          <button
            onClick={onCatalog}
            className="px-10 py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 relative"
            style={{ background: "linear-gradient(135deg, #a855f7, #00d4ff)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(168,85,247,0.5)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Открыть каталог
          </button>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 px-6 text-center text-sm text-muted-foreground">
        <span className="font-oswald font-bold text-white">ВУЗГИД</span> — платформа для выбора высшего образования в России © 2025
      </footer>
    </div>
  );
}

function CatalogPage({
  universities,
  search,
  setSearch,
  regionFilter,
  setRegionFilter,
  directionFilter,
  setDirectionFilter,
  ratingFilter,
  setRatingFilter,
}: CatalogPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-2">
          Каталог{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a855f7, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            вузов
          </span>
        </h1>
        <p className="text-muted-foreground">
          Найдено вузов: <span className="text-white font-semibold">{universities.length}</span>
        </p>
      </div>

      <div className="relative mb-6">
        <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Найти вуз по названию или городу..."
          className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            caretColor: "#a855f7",
          }}
          onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(168,85,247,0.5)")}
          onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)")}
        />
      </div>

      <div className="space-y-4 mb-8">
        <FilterRow label="Регион" options={REGIONS} value={regionFilter} onChange={setRegionFilter} />
        <FilterRow label="Направление" options={DIRECTIONS} value={directionFilter} onChange={setDirectionFilter} />
        <FilterRow label="Рейтинг" options={RATINGS} value={ratingFilter} onChange={setRatingFilter} />
      </div>

      {universities.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">Вузы не найдены. Попробуй изменить фильтры.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {universities.map((u: University) => (
            <UniversityCard key={u.id} u={u} rank={u.nationalRank} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground w-20 shrink-0">{label}:</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{
              background: value === opt ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${value === opt ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.08)"}`,
              color: value === opt ? "#a855f7" : "rgba(255,255,255,0.6)",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function UniversityCard({ u, rank }: { u: University; rank: number }) {
  const ratingColor =
    u.rating >= 9.5 ? "#a855f7" : u.rating >= 9 ? "#00d4ff" : u.rating >= 8.5 ? "#39ff14" : "#f59e0b";

  return (
    <div
      className="rounded-2xl p-5 cursor-pointer transition-all duration-300 flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = `1px solid ${u.color}40`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${u.color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: `${u.color}15` }}
          >
            {u.emoji}
          </div>
          <div>
            <div className="font-oswald font-bold text-white text-lg leading-tight">{u.short}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Icon name="MapPin" size={11} />
              {u.city}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-oswald text-2xl font-bold" style={{ color: ratingColor }}>
            {u.rating}
          </div>
          <div className="text-xs text-muted-foreground">#{rank} в РФ</div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{u.name}</div>

      <div className="flex flex-wrap gap-1.5">
        {u.tags.map((t: string) => (
          <span
            key={t}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: `${u.color}12`, border: `1px solid ${u.color}25`, color: u.color }}
          >
            {t}
          </span>
        ))}
        {u.budget && (
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", color: "#39ff14" }}
          >
            Бюджет
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="Users" size={12} />
          {(u.students / 1000).toFixed(0)}к студентов
        </div>
        <div className="text-xs font-semibold" style={{ color: u.color }}>
          от {(u.tuition / 1000).toFixed(0)}к ₽/год
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {u.directions.slice(0, 3).map((d: string) => (
          <span
            key={d}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {d}
          </span>
        ))}
        {u.directions.length > 3 && (
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            +{u.directions.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}