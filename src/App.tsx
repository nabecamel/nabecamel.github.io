import React, { useEffect, useRef, useState } from "react";

// ── Scroll reveal hook ──────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Section heading with gradient underline ─────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{children}</h2>
      <div className="mt-4 mx-auto h-1 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: "Frontend",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    label: "Backend / DB",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    skills: ["Spring Boot", "Supabase", "REST API"],
  },
  {
    label: "Tools / Infra",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
    skills: ["Playwright", "Railway", "Git", "GitHub Actions"],
  },
];

const projects = [
  {
    title: "E2Eテスト自動化ツール",
    description:
      "Railway上でGPT-4oとPlaywrightを組み合わせたE2Eテスト自動化ツール。テスト結果をSlack・Discordへ通知する機能を一から実装した副業案件。",
    tags: ["Playwright", "GPT-4o", "Railway", "Slack API", "Discord API"],
    gradient: "from-indigo-500 to-violet-600",
    icon: "🤖",
  },
  {
    title: "ポートフォリオサイト",
    description:
      "React + TypeScript + Tailwind CSSで構築した個人ポートフォリオサイト。GitHub Actionsによる自動デプロイをGitHub Pagesで運用。",
    tags: ["React", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    gradient: "from-violet-500 to-pink-500",
    icon: "🌐",
  },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

// ── App ─────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ["contact", "skills", "projects", "about", "hero"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      {/* ── Navigation ── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#hero"
            className={`text-lg font-bold tracking-tight transition-colors ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            nabecamel
          </a>
          <ul className="flex gap-8 list-none">
            {navLinks.map(({ href, label }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`relative text-sm font-medium transition-colors group ${
                      scrolled
                        ? isActive
                          ? "text-indigo-600"
                          : "text-gray-600 hover:text-indigo-600"
                        : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 60% 30%, #1e1b4b 0%, #0a0a1a 60%)" }}
      >
        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none animate-pulse-slow"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none animate-pulse-slow-delay"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(129,140,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,1) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="animate-fadeInUp inline-flex items-center gap-2 mb-8 px-5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-sm">
            <span>👋</span>
            <span>Welcome to my portfolio</span>
          </div>
          <h1 className="animate-fadeInUp-delay-1 text-7xl md:text-9xl font-black mb-4 leading-none bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">
            nabecamel
          </h1>
          <p className="animate-fadeInUp-delay-2 text-xl md:text-2xl text-gray-400 mb-10">
            Web Developer &amp; Software Engineer
          </p>
          <div className="animate-fadeInUp-delay-3 flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 animate-gradient-shift hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              お問い合わせ
            </a>
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full font-semibold text-white border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              作品を見る →
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 animate-scroll-bounce flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeading>About Me</SectionHeading>

          <AboutBody />
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} delay={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Skills</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group, i) => (
              <SkillGroup key={group.label} group={group} delay={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="py-28 px-4 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 40% 60%, #1e1b4b 0%, #0a0a1a 60%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(129,140,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,1) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ContactBody />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0a0a1a] border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2025 nabecamel. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ── About body (extracted to use reveal hook) ───────────────────────
function AboutBody() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal space-y-5 text-lg leading-relaxed text-gray-600">
      <p>
        はじめまして、nabecamelといいます。
        現在は会社でエンジニア研修を受けながら、個人で副業やプロダクト開発に取り組んでいます。
      </p>
      <div className="pl-5 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-lg">
        <p className="text-gray-700">
          初めての副業案件では、Railway上でGPT-4oとPlaywrightを組み合わせたE2Eテスト自動化ツールを開発し、SlackやDiscordへの通知を一通り実装しました。実務で使われる構成を自分の手で作れたことは、貴重な経験でした。
        </p>
      </div>
      <p>
        今はフロントエンド（React）やバックエンド（Spring Boot, Supabase）にも触れながら、フルスタックの開発スキルを少しずつ広げています。
      </p>
      <p>
        自分の得意なことを押し出すよりも、チームや依頼者の課題を一緒に考えながら動くのが好きです。話しやすい雰囲気づくりや、相手の期待を把握することを意識して仕事をしています。
      </p>
      <p className="font-medium text-gray-700">
        もし何かお力になれそうなことがあれば、気軽にお声がけください。
      </p>
    </div>
  );
}

// ── Project card ────────────────────────────────────────────────────
function ProjectCard({ project, delay }: { project: typeof projects[number]; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay + 1} group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-100/60 transition-all duration-300`}
    >
      {/* Card header gradient strip */}
      <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
      <div className="p-7">
        <div className="text-4xl mb-4">{project.icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skill group card ────────────────────────────────────────────────
function SkillGroup({ group, delay }: { group: typeof skillGroups[number]; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay + 1} rounded-2xl border ${group.border} ${group.bg} p-6`}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className={`h-3 w-3 rounded-full bg-gradient-to-br ${group.color}`} />
        <h3 className="font-bold text-gray-800">{group.label}</h3>
      </div>
      <ul className="flex flex-col gap-2 list-none">
        {group.skills.map((skill) => (
          <li key={skill} className="flex items-center gap-2 text-sm text-gray-700">
            <span className={`inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br ${group.color} flex-shrink-0`} />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Contact body ────────────────────────────────────────────────────
function ContactBody() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
      <div className="mx-auto mb-10 h-1 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
      <p className="text-gray-400 text-lg mb-12">
        お仕事のご依頼・ご相談はお気軽にどうぞ。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a
          href="mailto:watawata233013@gmail.com"
          className="group flex items-center gap-4 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-7 py-6 hover:bg-white/10 hover:-translate-y-1 hover:border-indigo-500/40 transition-all duration-200"
        >
          <span className="text-3xl">📧</span>
          <div className="text-left">
            <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-widest font-medium">Email</p>
            <p className="text-white font-semibold text-sm break-all">watawata233013@gmail.com</p>
          </div>
        </a>
        <a
          href="https://github.com/nabecamel"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-7 py-6 hover:bg-white/10 hover:-translate-y-1 hover:border-violet-500/40 transition-all duration-200"
        >
          <span className="text-3xl">🐙</span>
          <div className="text-left">
            <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-widest font-medium">GitHub</p>
            <p className="text-white font-semibold">github.com/nabecamel</p>
          </div>
        </a>
      </div>
    </div>
  );
}
