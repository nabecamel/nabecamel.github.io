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

// ── Wave dividers ─────────────────────────────────────────────────────
function WaveDown({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: 56, fill }}>
      <path d="M0,20 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" />
    </svg>
  );
}
function WaveUp({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: 56, fill }}>
      <path d="M0,36 C360,0 1080,56 1440,20 L1440,0 L0,0 Z" />
    </svg>
  );
}

// ── Section heading ───────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#1D4ED8]">{children}</h2>
      <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[#93C5FD]" />
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────
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
    accent:      "#1D4ED8",
    paleBg:      "#EFF6FF",
  },
  {
    title:       "ポートフォリオサイト",
    description: "React + TypeScript + Tailwind CSS で構築した個人ポートフォリオ。GitHub Actions による自動デプロイを運用中。",
    tags:        ["React", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    icon:        "🌊",
    accent:      "#2563EB",
    paleBg:      "#EFF6FF",
  },
];

const SKILLS = [
  {
    label: "Frontend",
    accent: "#1D4ED8",
    pale:   "#EFF6FF",
    items:  ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    label: "Backend / DB",
    accent: "#2563EB",
    pale:   "#EFF6FF",
    items:  ["Spring Boot", "Supabase", "REST API"],
  },
  {
    label: "Tools / Infra",
    accent: "#3B82F6",
    pale:   "#EFF6FF",
    items:  ["Playwright", "Railway", "Git", "GitHub Actions"],
  },
];

// ── App ───────────────────────────────────────────────────────────────
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
    <div className="min-h-screen bg-white">

      {/* ── Nav ── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Pacifico logo — same script style as reference */}
          <a href="#hero" className="font-pacifico text-2xl text-[#1D4ED8]"
            style={{ textShadow: "2px 3px 0 #BFDBFE" }}>
            nabecamel
          </a>
          <ul className="flex gap-8 list-none">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <a href={href}
                  className={`font-semibold text-sm transition-colors relative group ${
                    active === href.slice(1) ? "text-[#1D4ED8]" : "text-slate-400 hover:text-[#1D4ED8]"
                  }`}>
                  {label}
                  <span className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-[#93C5FD] transition-all duration-300 ${
                    active === href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white">

        {/* soft floating circles */}
        <div className="absolute top-16 right-16 w-64 h-64 rounded-full opacity-20 pointer-events-none animate-float"
          style={{ background: "radial-gradient(circle, #93C5FD 0%, transparent 70%)" }} />
        <div className="absolute bottom-24 left-12 w-48 h-48 rounded-full opacity-15 pointer-events-none animate-float-delay"
          style={{ background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 left-1/5 w-32 h-32 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #BFDBFE 0%, transparent 70%)" }} />

        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{ backgroundImage: "radial-gradient(circle, #1D4ED8 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

        {/* content */}
        <div className="relative z-10 text-center px-6">
          <div className="animate-fadeInUp inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-sm font-bold">
            <span>☀️</span>
            <span>Morning vibes · Portfolio 2025</span>
            <span>☕</span>
          </div>

          {/* Pacifico name with layered 3D shadow — like the Coffee reference */}
          <h1 className="font-pacifico animate-fadeInUp-delay-1 whitespace-nowrap text-[#1D4ED8]"
            style={{
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              lineHeight: 1.15,
              textShadow: "2px 3px 0 #93C5FD, 4px 6px 0 #BFDBFE",
            }}>
            nabecamel
          </h1>

          <p className="animate-fadeInUp-delay-2 font-semibold text-[#3B82F6] mt-4 mb-10"
            style={{ fontSize: "clamp(0.9rem, 2.2vw, 1.2rem)", letterSpacing: "0.07em" }}>
            Web Developer &amp; Software Engineer
          </p>

          <div className="animate-fadeInUp-delay-3 flex flex-wrap gap-4 justify-center">
            <a href="#contact"
              className="px-8 py-3.5 rounded-full font-bold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-200">
              お問い合わせ
            </a>
            <a href="#projects"
              className="px-8 py-3.5 rounded-full font-bold text-[#1D4ED8] border-2 border-[#93C5FD] bg-white hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200">
              作品を見る →
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 animate-scroll-bounce flex flex-col items-center gap-1.5 text-blue-300 text-xs font-semibold">
          scroll
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="absolute bottom-0 w-full">
          <WaveDown fill="#EFF6FF" />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-4" style={{ background: "#EFF6FF" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeading>About Me</SectionHeading>
          <AboutBody />
        </div>
      </section>

      <div style={{ background: "#EFF6FF" }}>
        <WaveDown fill="#FFFFFF" />
      </div>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={i} />)}
          </div>
        </div>
      </section>

      <div className="bg-white">
        <WaveDown fill="#EFF6FF" />
      </div>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 px-4" style={{ background: "#EFF6FF" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Skills</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((g, i) => <SkillGroup key={g.label} group={g} delay={i} />)}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <div style={{ background: "#EFF6FF" }}>
        <WaveUp fill="#DBEAFE" />
      </div>
      <section id="contact" className="py-24 px-4" style={{ background: "#DBEAFE" }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading>Contact</SectionHeading>
          <ContactCards />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 text-center text-sm font-semibold text-blue-400"
        style={{ background: "#DBEAFE" }}>
        © 2025 nabecamel. All rights reserved.
      </footer>
    </div>
  );
}

// ── About body ────────────────────────────────────────────────────────
function AboutBody() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal space-y-5 text-base leading-relaxed text-slate-600">
      <p>
        はじめまして、nabecamelといいます。
        現在は一部上場会社でエンジニアとして勤務しており、実装からテストまでを推進する業務を約1年間経験しています。
      </p>
      <div className="pl-5 py-4 pr-5 rounded-2xl border-l-4 border-[#1D4ED8] bg-white">
        <p className="text-[#1E3A8A] font-medium">
          副業案件として、Railway上でGPT-4oとPlaywrightを組み合わせたE2Eテスト自動化ツールを開発し、
          SlackやDiscordへの通知機能を実装しました。実務で使われる構成を自分の手で作れたことは、貴重な経験でした。
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
      <p className="font-bold text-[#1D4ED8]">
        もし何かお力になれそうなことがあれば、気軽にお声がけください ☕
      </p>
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────
function ProjectCard({ project, delay }: { project: (typeof PROJECTS)[number]; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}
      className={`reveal reveal-delay-${delay + 1} bg-white rounded-3xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300`}
      style={{ boxShadow: "0 4px 20px rgba(29,78,216,0.10)" }}>
      <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${project.accent}, #93C5FD)` }} />
      <div className="p-7">
        <div className="text-4xl mb-4">{project.icon}</div>
        <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-3">{project.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full font-bold"
              style={{ background: project.paleBg, color: project.accent }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skill group ───────────────────────────────────────────────────────
function SkillGroup({ group, delay }: { group: (typeof SKILLS)[number]; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}
      className={`reveal reveal-delay-${delay + 1} bg-white rounded-3xl p-6 shadow-sm`}
      style={{ boxShadow: "0 4px 16px rgba(29,78,216,0.08)" }}>
      <h3 className="text-base font-extrabold mb-5" style={{ color: group.accent }}>
        {group.label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <span key={skill} className="text-xs px-3 py-1.5 rounded-full font-bold"
            style={{ background: group.pale, color: group.accent, boxShadow: "0 2px 6px rgba(29,78,216,0.12)" }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Contact cards ─────────────────────────────────────────────────────
function ContactCards() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      <p className="text-[#3B82F6] font-semibold mb-10">
        お仕事のご依頼・ご相談はお気軽にどうぞ。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { href: "mailto:watawata233013@gmail.com", icon: "📧", label: "Email",  value: "watawata233013@gmail.com", external: false },
          { href: "https://github.com/nabecamel",    icon: "🐙", label: "GitHub", value: "github.com/nabecamel",       external: true  },
        ].map(({ href, icon, label, value, external }) => (
          <a key={label} href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            style={{ boxShadow: "0 4px 16px rgba(29,78,216,0.10)" }}>
            <span className="text-3xl">{icon}</span>
            <div className="text-left">
              <p className="text-xs font-extrabold text-[#1D4ED8] mb-0.5">{label}</p>
              <p className="text-slate-500 text-sm font-semibold break-all">{value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
