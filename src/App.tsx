import React, { useEffect, useRef, useState } from "react";

// ── Scroll reveal ────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ── Graffiti section heading ─────────────────────────────────────────
function GrafHeading({ children }: { children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal text-center mb-14">
      <h2 className="font-bebas text-6xl md:text-7xl text-white" style={{ letterSpacing: "0.06em" }}>
        {children}
      </h2>
      {/* paint stroke bar */}
      <div className="flex justify-center gap-1 mt-3">
        <div className="h-[3px] w-10 bg-[#FFE600]" />
        <div className="h-[3px] w-4  bg-[#FF2D78]" />
        <div className="h-[3px] w-7  bg-[#00C2FF]" />
      </div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────
const NAV = [
  { href: "#about",    label: "ABOUT"    },
  { href: "#projects", label: "PROJECTS" },
  { href: "#skills",   label: "SKILLS"   },
  { href: "#contact",  label: "CONTACT"  },
];

const PROJECTS = [
  {
    label:       "PROJECT_01",
    title:       "E2Eテスト自動化ツール",
    description: "Railway上でGPT-4oとPlaywrightを組み合わせたE2Eテスト自動化ツール。SlackやDiscordへの通知機能も実装した副業案件。",
    tags:        ["Playwright", "GPT-4o", "Railway", "Slack API"],
    accent:      "#FFE600",
  },
  {
    label:       "PROJECT_02",
    title:       "ポートフォリオサイト",
    description: "React + TypeScript + Tailwind CSS で構築した個人ポートフォリオ。GitHub Actions による自動デプロイを運用中。",
    tags:        ["React", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    accent:      "#FF2D78",
  },
];

const SKILLS = [
  {
    label:  "FRONTEND",
    color:  "#00C2FF",
    items:  ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    label:  "BACKEND / DB",
    color:  "#39FF14",
    items:  ["Spring Boot", "Supabase", "REST API"],
  },
  {
    label:  "TOOLS / INFRA",
    color:  "#FF2D78",
    items:  ["Playwright", "Railway", "Git", "GitHub Actions"],
  },
];

// ── Noise texture (concrete wall feel) ───────────────────────────────
const NOISE_BG = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundSize: "200px 200px",
} as React.CSSProperties;

// ── App ──────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const ids = ["contact", "skills", "projects", "about", "hero"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* ── Nav ── */}
      <header className="fixed top-0 w-full z-50 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="font-marker text-2xl text-[#FFE600]">
            nabecamel
          </a>
          <ul className="flex gap-8 list-none">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`font-bebas text-sm transition-colors ${
                    active === href.slice(1) ? "text-[#FFE600]" : "text-gray-500 hover:text-[#FFE600]"
                  }`}
                  style={{ letterSpacing: "0.18em" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0d0d0d]"
      >
        {/* concrete texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={NOISE_BG} />

        {/* spray paint glows */}
        <div
          className="absolute -top-32 -left-52 w-[700px] h-[700px] rounded-full pointer-events-none animate-neon-pulse"
          style={{ background: "radial-gradient(circle, rgba(255,230,0,0.35) 0%, transparent 65%)", filter: "blur(30px)" }}
        />
        <div
          className="absolute -bottom-32 -right-52 w-[600px] h-[600px] rounded-full pointer-events-none animate-neon-pulse-delay"
          style={{ background: "radial-gradient(circle, rgba(255,45,120,0.3) 0%, transparent 65%)", filter: "blur(30px)" }}
        />
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,194,255,0.15) 0%, transparent 70%)", filter: "blur(50px)" }}
        />

        {/* faded graffiti tags in background */}
        <span
          className="font-marker absolute top-24 left-6 text-5xl text-[#FFE600]/10 -rotate-12 select-none pointer-events-none"
        >
          #tag
        </span>
        <span
          className="font-marker absolute bottom-28 right-6 text-4xl text-[#FF2D78]/10 rotate-6 select-none pointer-events-none"
        >
          street
        </span>
        <span
          className="font-marker absolute top-1/3 right-12 text-3xl text-[#00C2FF]/10 -rotate-6 select-none pointer-events-none"
        >
          crew
        </span>

        {/* main content */}
        <div className="relative z-10 text-center px-6">
          <div className="animate-fadeInUp inline-block mb-8 px-5 py-1 border border-[#FFE600]/30 bg-[#FFE600]/5">
            <span className="font-bebas text-[#FFE600] text-sm" style={{ letterSpacing: "0.25em" }}>
              ◉ PORTFOLIO 2025 ◉
            </span>
          </div>

          {/* Name — uses clamp + whitespace-nowrap to prevent wrapping */}
          <h1
            className="font-marker animate-fadeInUp-delay-1 whitespace-nowrap"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 7.5rem)",
              lineHeight: 1.1,
              background: "linear-gradient(120deg, #FFE600 0%, #FF2D78 50%, #00C2FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 28px rgba(255,230,0,0.45))",
            }}
          >
            nabecamel
          </h1>

          <p
            className="font-bebas animate-fadeInUp-delay-2 mt-4 mb-10 text-gray-400"
            style={{ fontSize: "clamp(1rem, 2.8vw, 1.6rem)", letterSpacing: "0.28em" }}
          >
            WEB DEVELOPER &amp; SOFTWARE ENGINEER
          </p>

          <div className="animate-fadeInUp-delay-3 flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="font-bebas px-8 py-3 bg-[#FFE600] text-[#0d0d0d] hover:-translate-y-1 hover:shadow-[0_0_22px_rgba(255,230,0,0.55)] transition-all duration-200"
              style={{ letterSpacing: "0.15em" }}
            >
              CONTACT ME
            </a>
            <a
              href="#projects"
              className="font-bebas px-8 py-3 border-2 border-[#FFE600] text-[#FFE600] hover:bg-[#FFE600]/10 hover:-translate-y-1 transition-all duration-200"
              style={{ letterSpacing: "0.15em" }}
            >
              VIEW PROJECTS →
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div
          className="font-bebas absolute bottom-10 left-1/2 animate-scroll-bounce flex flex-col items-center gap-2 text-[#FFE600]/35 text-xs"
          style={{ letterSpacing: "0.22em" }}
        >
          SCROLL
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative py-28 px-4 bg-[#111111]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={NOISE_BG} />
        <div className="relative max-w-3xl mx-auto">
          <GrafHeading>ABOUT ME</GrafHeading>
          <AboutBody />
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="relative py-28 px-4 bg-[#0d0d0d]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={NOISE_BG} />
        <div className="relative max-w-5xl mx-auto">
          <GrafHeading>PROJECTS</GrafHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => <ProjectCard key={p.label} project={p} delay={i} />)}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="relative py-28 px-4 bg-[#111111]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={NOISE_BG} />
        <div className="relative max-w-4xl mx-auto">
          <GrafHeading>SKILLS</GrafHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((g, i) => <SkillGroup key={g.label} group={g} delay={i} />)}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="relative py-28 px-4 bg-[#0d0d0d]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={NOISE_BG} />
        <div className="relative max-w-3xl mx-auto text-center">
          <GrafHeading>GET IN TOUCH</GrafHeading>
          <ContactCards />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#080808] border-t border-white/5 py-7 text-center">
        <p
          className="font-bebas text-gray-600 text-sm"
          style={{ letterSpacing: "0.2em" }}
        >
          © 2025 NABECAMEL. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}

// ── About body ───────────────────────────────────────────────────────
function AboutBody() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal space-y-5 text-base leading-relaxed text-gray-400">
      <p>
        はじめまして、nabecamelといいます。
        現在は会社でエンジニア研修を受けながら、個人で副業やプロダクト開発に取り組んでいます。
      </p>
      <div className="pl-5 border-l-[3px] border-[#FFE600] bg-[#FFE600]/5 py-4 pr-4">
        <p className="text-gray-200">
          初めての副業案件では、Railway上でGPT-4oとPlaywrightを組み合わせたE2Eテスト自動化ツールを開発し、
          SlackやDiscordへの通知を一通り実装しました。実務で使われる構成を自分の手で作れたことは、貴重な経験でした。
        </p>
      </div>
      <p>
        今はフロントエンド（React）やバックエンド（Spring Boot, Supabase）にも触れながら、
        フルスタックの開発スキルを少しずつ広げています。
      </p>
      <p>
        自分の得意なことを押し出すよりも、チームや依頼者の課題を一緒に考えながら動くのが好きです。
        話しやすい雰囲気づくりや、相手の期待を把握することを意識して仕事をしています。
      </p>
      <p className="text-white font-medium">
        もし何かお力になれそうなことがあれば、気軽にお声がけください。
      </p>
    </div>
  );
}

// ── Project card ─────────────────────────────────────────────────────
function ProjectCard({
  project,
  delay,
}: {
  project: (typeof PROJECTS)[number];
  delay: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay + 1} bg-[#1a1a1a] border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-2`}
      style={{
        boxShadow: hovered
          ? `0 0 0 1px ${project.accent}55, 0 0 30px ${project.accent}22`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* header strip */}
      <div
        className="px-6 py-3 flex items-center justify-between"
        style={{ borderBottom: `2px solid ${project.accent}` }}
      >
        <span
          className="font-bebas text-xs"
          style={{ color: project.accent, letterSpacing: "0.22em" }}
        >
          {project.label}
        </span>
        <span className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
      </div>

      <div className="p-6">
        <h3
          className="font-bebas text-2xl text-white mb-3"
          style={{ letterSpacing: "0.05em" }}
        >
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-0.5 border font-medium"
              style={{
                borderColor: `${project.accent}44`,
                color: project.accent,
                background: `${project.accent}0d`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skill group card ─────────────────────────────────────────────────
function SkillGroup({
  group,
  delay,
}: {
  group: (typeof SKILLS)[number];
  delay: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay + 1} bg-[#1a1a1a] border border-white/5 p-6`}
    >
      <div className="pb-3 mb-5" style={{ borderBottom: `2px solid ${group.color}` }}>
        <h3
          className="font-bebas text-xl"
          style={{ color: group.color, letterSpacing: "0.18em" }}
        >
          {group.label}
        </h3>
      </div>
      <ul className="flex flex-col gap-2.5 list-none">
        {group.items.map((skill) => (
          <li key={skill} className="flex items-center gap-3 text-sm text-gray-400">
            <span style={{ color: group.color }} className="text-xs">▶</span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Contact cards ────────────────────────────────────────────────────
function ContactCards() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      <p className="text-gray-500 mb-12">お仕事のご依頼・ご相談はお気軽にどうぞ。</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            href:    "mailto:watawata233013@gmail.com",
            icon:    "📧",
            accent:  "#FFE600",
            label:   "EMAIL",
            value:   "watawata233013@gmail.com",
            external: false,
          },
          {
            href:    "https://github.com/nabecamel",
            icon:    "🐙",
            accent:  "#FF2D78",
            label:   "GITHUB",
            value:   "github.com/nabecamel",
            external: true,
          },
        ].map(({ href, icon, accent, label, value, external }) => (
          <ContactCard
            key={label}
            href={href}
            icon={icon}
            accent={accent}
            label={label}
            value={value}
            external={external}
          />
        ))}
      </div>
    </div>
  );
}

function ContactCard({
  href,
  icon,
  accent,
  label,
  value,
  external,
}: {
  href: string;
  icon: string;
  accent: string;
  label: string;
  value: string;
  external: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-4 bg-[#1a1a1a] border border-white/5 px-7 py-6 transition-all duration-200 hover:-translate-y-1"
      style={{
        borderBottom: `2px solid ${accent}`,
        boxShadow: hovered ? `0 0 22px ${accent}28` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-3xl">{icon}</span>
      <div className="text-left">
        <p
          className="font-bebas text-xs mb-1"
          style={{ color: accent, letterSpacing: "0.2em" }}
        >
          {label}
        </p>
        <p className="text-gray-300 text-sm break-all">{value}</p>
      </div>
    </a>
  );
}
