import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog";

interface University {
  id: number;
  name: string;
  short: string;
  city: string;
  students: number;
  directions: string[];
  tuition: number;
  budget: boolean;
  accent: string;
  accentBg: string;
  emoji: string;
  tags: string[];
  about: string;
}

const UNIVERSITIES: University[] = [
  {
    id: 1,
    name: "Московский государственный строительный университет",
    short: "МГСУ",
    city: "Москва",
    students: 15000,
    directions: ["Строительство", "Архитектура", "Инженерия", "Экология"],
    tuition: 245000,
    budget: true,
    accent: "#c06fa0", accentBg: "#fdf0f7", emoji: "🏗️",
    tags: ["Строительство", "Москва", "Старейший"],
    about: "Главный строительный университет страны. Готовит инженеров-строителей, проектировщиков и специалистов по строительным технологиям.",
  },
  {
    id: 2,
    name: "Санкт-Петербургский государственный архитектурно-строительный университет",
    short: "СПбГАСУ",
    city: "Санкт-Петербург",
    students: 8500,
    directions: ["Архитектура", "Строительство", "Дизайн среды", "Геодезия"],
    tuition: 210000,
    budget: true,
    accent: "#9b8bc0", accentBg: "#f4f0fc", emoji: "🏛️",
    tags: ["Архитектура", "Петербург", "Дизайн"],
    about: "Один из старейших технических вузов России. Сильная архитектурная школа с богатыми традициями петербургской архитектуры.",
  },
  {
    id: 3,
    name: "Казанский государственный архитектурно-строительный университет",
    short: "КГАСУ",
    city: "Казань",
    students: 7200,
    directions: ["Архитектура", "Строительство", "Реставрация", "Транспорт"],
    tuition: 155000,
    budget: true,
    accent: "#c09060", accentBg: "#fdf6ee", emoji: "🕌",
    tags: ["Архитектура", "Казань", "Реставрация"],
    about: "Ведущий архитектурно-строительный вуз Поволжья. Уникальные программы по реставрации объектов культурного наследия.",
  },
  {
    id: 4,
    name: "Ижевский государственный технический университет им. М.Т. Калашникова",
    short: "ИжГТУ",
    city: "Ижевск",
    students: 10000,
    directions: ["Строительство", "Машиностроение", "IT", "Экономика"],
    tuition: 120000,
    budget: true,
    accent: "#7b9fd4", accentBg: "#f0f4fd", emoji: "⚙️",
    tags: ["Технический", "Ижевск", "Доступность"],
    about: "Многопрофильный технический университет с развитым строительным факультетом. Одна из самых доступных цен на обучение среди технических вузов.",
  },
  {
    id: 5,
    name: "Пензенский государственный университет архитектуры и строительства",
    short: "ПГУАС",
    city: "Пенза",
    students: 5500,
    directions: ["Архитектура", "Строительство", "Дизайн", "Землеустройство"],
    tuition: 110000,
    budget: true,
    accent: "#7ab89a", accentBg: "#eef8f2", emoji: "🌿",
    tags: ["Архитектура", "Пенза", "Небольшой"],
    about: "Специализированный архитектурно-строительный вуз. Небольшой и уютный — преподаватели знают студентов в лицо.",
  },
  {
    id: 6,
    name: "Московский архитектурный институт (Государственная академия)",
    short: "МАрхИ",
    city: "Москва",
    students: 2800,
    directions: ["Архитектура", "Дизайн среды", "Градостроительство", "Реставрация"],
    tuition: 380000,
    budget: true,
    accent: "#d4907a", accentBg: "#fdf2ee", emoji: "✏️",
    tags: ["Архитектура", "Элитный", "Творческий"],
    about: "Самый престижный архитектурный вуз России. Маленький, конкурс огромный — поступают единицы. Зато диплом МАрхИ открывает любые двери.",
  },
];


export default function Index() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen font-golos" style={{ background: "hsl(var(--background))" }}>
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
      {page === "catalog" && <CatalogPage />}
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

      {/* PAIN POINTS + PERSONAL */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-5">

          {/* Pain header */}
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#c06fa0" }}>Почему это так сложно</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#3d2550" }}>
              Выбор вуза — это{" "}
              <span className="text-gradient-rose italic">настоящий стресс</span>
            </h2>
          </div>

          {/* Pain cards row */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { emoji: "🌀", title: "Информации слишком много", text: "Сотни вузов, тысячи направлений, противоречивые рейтинги — и всё это нужно как-то переварить за несколько месяцев.", color: "#c06fa0", bg: "#fdf0f7" },
              { emoji: "🗣️", title: "Все советуют разное", text: "Родители говорят одно, учителя — другое, друзья — третье. А ты посередине и не знаешь, чьему совету доверять.", color: "#9b8bc0", bg: "#f4f0fc" },
              { emoji: "⏳", title: "Времени почти нет", text: "ЕГЭ, подготовка, последний год в школе. Найти момент чтобы спокойно изучить все варианты — почти нереально.", color: "#7b9fd4", bg: "#f0f4fd" },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{ background: card.bg, border: `1px solid ${card.color}18` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${card.color}22`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <div className="font-cormorant text-xl font-bold mb-2 leading-snug" style={{ color: "#3d2550" }}>{card.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "#8a6a84" }}>{card.text}</p>
              </div>
            ))}
          </div>

          {/* Personal block */}
          <div
            className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center mt-2"
            style={{ background: "linear-gradient(135deg, #fce8f3, #ede8fc)", border: "1px solid rgba(192,111,160,0.15)" }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shrink-0 self-start md:self-center" style={{ background: "linear-gradient(135deg, #f4a7c3, #c9b8e8)" }}>
              🙋‍♀️
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#c06fa0" }}>Немного обо мне</div>
              <p className="text-base leading-relaxed mb-1" style={{ color: "#3d2550" }}>
                <span style={{ fontWeight: 600 }}>Я сама в этой ситуации.</span> 11-й класс, впереди ЕГЭ и вопрос, который не даёт покоя — куда поступать?
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#8a6a84" }}>
                Я устала от хаоса в интернете и решила сделать то, чего мне не хватало — простой сайт, где можно отфильтровать вузы по тому, что важно именно тебе. Без лишнего. Только нужное.
              </p>
            </div>
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

function CatalogPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-cormorant text-5xl font-bold mb-2" style={{ color: "#3d2550" }}>
          Каталог <span className="text-gradient-rose italic">вузов</span>
        </h1>
        <p className="text-sm" style={{ color: "#9a7a8a" }}>
          Архитектурные и строительные вузы, которые я рассматриваю для поступления
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {UNIVERSITIES.map((u) => (
          <UniversityCard key={u.id} u={u} />
        ))}
      </div>
    </div>
  );
}

function UniversityCard({ u }: { u: University }) {
  return (
    <div
      className="rounded-2xl p-6 transition-all duration-300 flex flex-col gap-4"
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
      <div className="flex items-center gap-3">
        <div className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: u.accentBg }}>
          {u.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-cormorant font-bold text-xl leading-tight" style={{ color: "#3d2550" }}>{u.short}</div>
          <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "#b89ab0" }}>
            <Icon name="MapPin" size={10} style={{ color: "#b89ab0" }} /> {u.city}
          </div>
        </div>
        {u.budget && (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium shrink-0" style={{ background: "#eef8f2", color: "#7ab89a" }}>
            Бюджет есть
          </span>
        )}
      </div>

      {/* Full name */}
      <div className="text-xs leading-relaxed" style={{ color: "#b89ab0" }}>{u.name}</div>

      {/* About */}
      <p className="text-sm leading-relaxed" style={{ color: "#6a4a64" }}>{u.about}</p>

      {/* Directions */}
      <div className="flex flex-wrap gap-1.5">
        {u.directions.map((d) => (
          <span key={d} className="px-2.5 py-1 rounded-full text-xs" style={{ background: u.accentBg, color: u.accent }}>
            {d}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(210,180,225,0.25)" }}>
        <div className="flex items-center gap-1 text-xs" style={{ color: "#b89ab0" }}>
          <Icon name="Users" size={11} style={{ color: "#b89ab0" }} />
          ~{(u.students / 1000).toFixed(0)}к студентов
        </div>
        <div className="text-sm font-semibold" style={{ color: u.accent }}>
          от {(u.tuition / 1000).toFixed(0)}к ₽/год
        </div>
      </div>
    </div>
  );
}