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

// ── Wave divider ─────────────────────────────────────────────────────
function WaveDown({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: 56, fill }}
    >
      <path d="M0,20 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" />
    </svg>
  );
}
function WaveUp({ fill }: { fill: string }) {
  return (
    <svg
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: 56, fill }}
    >
      <path d="M0,36 C360,0 1080,56 1440,20 L1440,0 L0,0 Z" />
    </svg>
  );
}

// ── Section heading ──────────────────────────────────────────────────
function SectionHeading({
  children,
  accent = "#2A9BD5",
}: {
  children: React.ReactNode;
  accent?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F3D5C]">
        {children}
      </h2>
      <div
        className="mx-auto mt-3 h-1.5 w-12 rounded-full"
        style={{ background: accent }}
      />
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────
const NAV = [
  { href: "#about",    label: "About"    },
  { href: "#projects", label: "Projects" },
  { href: "#skills",   label: "Skills"   },
  { href: "#contact",  label: "Contact"  },
];

const PROJECTS = [
  {
    title:       "E2Eテスト自動化ツール",
    description: "Railway上でGPT-4oとPlaywrightを組み合わせたE2Eテスト自動化ツール。SlackやDiscordへの通知機能も実装した副業案件。",
    tags:        ["Playwright", "GPT-4o", "Railway", "Slack API"],
    icon:        "🤖",
    accent:      "#2A9BD5",
    paleBg:      "#EBF6FD",
  },
  {
    title:       "ポートフォリオサイト",
    description: "React + TypeScript + Tailwind CSS で構築した個人ポートフォリオ。GitHub Actions による自動デプロイを運用中。",
    tags:        ["React", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    icon:        "🌊",
    accent:      "#38B89A",
    paleBg:      "#E8FAF5",
  },
];

const SKILLS = [
  {
    label: "Frontend",
    accent: "#2A9BD5",
    pale:   "#EBF6FD",
    items:  ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    label: "Backend / DB",
    accent: "#38B89A",
    pale:   "#E8FAF5",
    items:  ["Spring Boot", "Supabase", "REST API"],
  },
  {
    label: "Tools / Infra",
    accent: "#5AABDF",
    pale:   "#EEF8FF",
    items:  ["Playwright", "Railway", "Git", "GitHub Actions"],
  },
];

// ── App ──────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
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
    <div className="min-h-screen" style={{ background: "#FAFCFF" }}>

      {/* ── Nav ── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#hero"
            className="text-2xl font-black text-[#2A9BD5]"
          >
            nabecamel
          </a>
          <ul className="flex gap-8 list-none">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`font-semibold text-sm transition-colors relative group ${
                    active === href.slice(1)
                      ? "text-[#2A9BD5]"
                      : "text-[#3A6478] hover:text-[#2A9BD5]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-[#2A9BD5] transition-all duration-300 ${
                      active === href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(150deg, #D6EEFB 0%, #E8F8F3 40%, #F5FCFF 80%, #FAFEFF 100%)",
        }}
      >
        {/* decorative soft circles */}
        <div
          className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-30 pointer-events-none animate-float"
          style={{ background: "radial-gradient(circle, #7DD5F5 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 left-10 w-56 h-56 rounded-full opacity-25 pointer-events-none animate-float-delay"
          style={{ background: "radial-gradient(circle, #60D4B4 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #A8E6F5 0%, transparent 70%)" }}
        />

        {/* dot grid (maritime) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #2A9BD5 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* content */}
        <div className="relative z-10 text-center px-6">
          <div className="animate-fadeInUp inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/70 backdrop-blur shadow-sm text-[#2A9BD5] text-sm font-bold">
            <span>☀️</span>
            <span>Morning vibes · Portfolio 2025</span>
            <span>🌊</span>
          </div>

          <h1
            className="animate-fadeInUp-delay-1 font-black text-[#0F3D5C] whitespace-nowrap"
            style={{
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              lineHeight: 1.1,
              textShadow: "0 4px 24px rgba(42,155,213,0.15)",
            }}
          >
            nabecamel
          </h1>

          <p
            className="animate-fadeInUp-delay-2 font-semibold text-[#5AABDF] mt-3 mb-10"
            style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.35rem)", letterSpacing: "0.06em" }}
          >
            Web Developer &amp; Software Engineer
          </p>

          <div className="animate-fadeInUp-delay-3 flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full font-bold text-white bg-[#2A9BD5] hover:bg-[#1E87C1] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2A9BD5]/30 transition-all duration-200"
            >
              お問い合わせ
            </a>
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full font-bold text-[#38B89A] border-2 border-[#38B89A] bg-white/60 backdrop-blur hover:bg-[#38B89A]/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              作品を見る →
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 animate-scroll-bounce flex flex-col items-center gap-1.5 text-[#7AAFC0] text-xs font-semibold"
        >
          scroll
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* bottom wave */}
        <div className="absolute bottom-0 w-full">
          <WaveDown fill="#FFFFFF" />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeading accent="#2A9BD5">About Me</SectionHeading>
          <AboutBody />
        </div>
      </section>

      {/* wave to tinted */}
      <div className="bg-white">
        <WaveDown fill="#EFF9FD" />
      </div>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 px-4" style={{ background: "#EFF9FD" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading accent="#38B89A">Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} delay={i} />
            ))}
          </div>
        </div>
      </section>

      {/* wave back to white */}
      <div style={{ background: "#EFF9FD" }}>
        <WaveDown fill="#FFFFFF" />
      </div>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading accent="#2A9BD5">Skills</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((g, i) => (
              <SkillGroup key={g.label} group={g} delay={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <div className="bg-white">
        <WaveUp fill="#D6EEFB" />
      </div>
      <section
        id="contact"
        className="py-24 px-4"
        style={{ background: "linear-gradient(150deg, #D6EEFB 0%, #E4F7F0 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading accent="#2A9BD5">Contact</SectionHeading>
          <ContactCards />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8 text-center text-sm font-semibold text-[#7AAFC0]"
        style={{ background: "#D6EEFB" }}
      >
        © 2025 nabecamel. All rights reserved.
      </footer>
    </div>
  );
}

// ── About body ───────────────────────────────────────────────────────
function AboutBody() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal space-y-5 text-base leading-relaxed text-[#3A6478]">
      <p>
        はじめまして、nabecamelといいます。
        現在は会社でエンジニア研修を受けながら、個人で副業やプロダクト開発に取り組んでいます。
      </p>
      <div
        className="pl-5 py-4 pr-5 rounded-2xl border-l-4"
        style={{
          borderColor: "#2A9BD5",
          background: "linear-gradient(135deg, #EBF6FD, #F5FCFF)",
        }}
      >
        <p className="text-[#0F3D5C] font-medium">
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
      <p className="font-bold text-[#0F3D5C]">
        もし何かお力になれそうなことがあれば、気軽にお声がけください ☕
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
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay + 1} bg-white rounded-3xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300`}
      style={{ boxShadow: `0 4px 20px ${project.accent}18` }}
    >
      {/* top accent strip */}
      <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}88)` }} />

      <div className="p-7">
        <div className="text-4xl mb-4">{project.icon}</div>
        <h3 className="text-xl font-extrabold text-[#0F3D5C] mb-3">{project.title}</h3>
        <p className="text-[#3A6478] text-sm leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-bold"
              style={{ background: project.paleBg, color: project.accent }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skill group ──────────────────────────────────────────────────────
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
      className={`reveal reveal-delay-${delay + 1} rounded-3xl p-6`}
      style={{ background: group.pale, border: `1.5px solid ${group.accent}30` }}
    >
      <h3
        className="text-base font-extrabold mb-5"
        style={{ color: group.accent }}
      >
        {group.label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1.5 rounded-full font-bold bg-white"
            style={{ color: group.accent, boxShadow: `0 2px 8px ${group.accent}20` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Contact cards ────────────────────────────────────────────────────
function ContactCards() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      <p className="text-[#3A6478] font-semibold mb-10">
        お仕事のご依頼・ご相談はお気軽にどうぞ。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          {
            href:     "mailto:watawata233013@gmail.com",
            icon:     "📧",
            label:    "Email",
            value:    "watawata233013@gmail.com",
            accent:   "#2A9BD5",
            external: false,
          },
          {
            href:     "https://github.com/nabecamel",
            icon:     "🐙",
            label:    "GitHub",
            value:    "github.com/nabecamel",
            accent:   "#38B89A",
            external: true,
          },
        ].map(({ href, icon, label, value, accent, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            style={{ boxShadow: `0 4px 16px ${accent}18` }}
          >
            <span className="text-3xl">{icon}</span>
            <div className="text-left">
              <p className="text-xs font-extrabold mb-0.5" style={{ color: accent }}>
                {label}
              </p>
              <p className="text-[#3A6478] text-sm font-semibold break-all">{value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
