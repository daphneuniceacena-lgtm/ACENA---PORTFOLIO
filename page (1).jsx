"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Menu,
  X,
  Github,
  Mail,
  Linkedin,
  MessageCircle,
  Facebook,
  ExternalLink,
  ArrowDown,
  ArrowUpRight,
  Cpu,
  Bot,
  Globe,
  Smartphone,
  Sparkles,
  Search,
  Compass,
  Hammer,
  MapPin,
  GraduationCap,
  Plus,
  Minus,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Content — sourced from Daph's own data                             */
/* ------------------------------------------------------------------ */

const NAME = "Daph";
const EMAIL = "ADU0012@hs.dlsud.edu.ph";
const GITHUB_URL = "https://github.com/daphneuniceacena-lgtm";
// TODO — swap in real profile URLs
const LINKEDIN_URL = "#";
const WHATSAPP_URL = "#";
const FACEBOOK_URL = "#";

const NAV = [
  { id: "home", label: "Home" },
  { id: "expertise", label: "Expertise" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const MARQUEE_ITEMS = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "TensorFlow Lite",
  "Arduino",
  "Cloudflare Workers",
  "Figma",
  "Python",
  "Raspberry Pi",
];

const CAPABILITIES = [
  { label: "AI Automation", icon: Sparkles },
  { label: "Web Systems", icon: Globe },
  { label: "Static Sites", icon: Cpu },
  { label: "Mobile Apps", icon: Smartphone },
];

const SERVICES = [
  {
    icon: Sparkles,
    title: "AI Automation",
    desc: "Vision and ML pipelines that do the boring counting and sorting for you — from crop detection to ensemble classifiers.",
    big: true,
  },
  {
    icon: Cpu,
    title: "Static Sites",
    desc: "Fast, dependency-light front ends for teams who need a page live yesterday.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    desc: "Full-stack systems on Cloudflare Workers, D1 and Pages — built to run without a vendor bill.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Lightweight companion apps for the hardware I build, tuned for real classrooms and fields.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Discover",
    icon: Search,
    desc: "I start with the problem, not the tool — who's affected, what they actually need, and what success looks like.",
  },
  {
    n: "02",
    title: "Plan",
    icon: Compass,
    desc: "Architecture, UX flows, and scope get mapped out before a line of code ships, so nothing gets rebuilt twice.",
  },
  {
    n: "03",
    title: "Build",
    icon: Hammer,
    desc: "Development in short loops — test, get feedback, iterate — until it holds up outside the demo.",
  },
];

const PROJECTS = [
  {
    part: "LINK-01",
    name: "Project LINK",
    blurb:
      "A full-stack student portal built for the DLSU-D Higher School Student Council after third-party platforms priced them out. Role-based editing, appointment scheduling, dark mode.",
    tags: ["JavaScript", "Cloudflare Workers", "D1"],
    live: "#",
    github: GITHUB_URL,
  },
  {
    part: "AGRO-02",
    name: "AGRO",
    blurb:
      "An agricultural robot rebuilt from an RC car chassis onto a Raspberry Pi 4 + Arduino Uno stack, counting crops and excluding wilting plants with TensorFlow Lite.",
    tags: ["Python", "TensorFlow Lite", "Raspberry Pi"],
    live: "#",
    github: GITHUB_URL,
  },
  {
    part: "NANO-V1",
    name: "ACE NANO V1",
    blurb:
      "A competition sumobot reading five IR sensors and two boundary sensors to hunt opponents and hold the dohyo, with DIP-switch strategy selection.",
    tags: ["Arduino", "C++", "Robotics"],
    live: "#",
    github: GITHUB_URL,
  },
  {
    part: "NEURA-03",
    name: "Neurace",
    blurb:
      "A web-based learning platform for coding, electronics and ML — eight modules, inline circuit schematics, streak-tracked accounts on D1 + R2.",
    tags: ["React", "Cloudflare D1", "R2"],
    live: "#",
    github: GITHUB_URL,
  },
  {
    part: "APOAI-26",
    name: "APOAI 2026",
    blurb:
      "Three ML solutions for the APOAI competition: a soft-voting ensemble for astronomical classification, a MelResNet audio pipeline, and a stacked molecular-property model.",
    tags: ["Python", "PyTorch", "ML"],
    live: "#",
    github: GITHUB_URL,
  },
];

const EXPERIENCE = [
  { role: "Robotics Captain & Research Head", org: "Animo SPEAR", detail: "2026 – Present" },
  { role: "Founder & President", org: "Green Patriots Mathematical Guild", detail: "2025 – Present" },
  { role: "Assistant Robotics Officer", org: "Animo SPEAR", detail: "2025 – 2026" },
  { role: "Vice President, Internal", org: "Student Body Organization", detail: "2024 – 2025" },
  { role: "Class President", org: "Junior High School", detail: "2023" },
];

/* ------------------------------------------------------------------ */
/* Small hooks                                                        */
/* ------------------------------------------------------------------ */

function useInView(ref, threshold = 0.3) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

/* ------------------------------------------------------------------ */
/* Main page                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const heroNameRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroPortraitRef = useRef(null);
  const heroCardRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  /* nav scroll-spy */
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* one orchestrated hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(heroNameRef.current, { y: 46, opacity: 0, duration: 0.8 })
        .from(heroSubRef.current, { y: 24, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(
          heroPortraitRef.current,
          { scale: 0.94, opacity: 0, duration: 0.9, ease: "power2.out" },
          "-=0.6"
        )
        .from(heroCardRef.current, { x: 30, opacity: 0, duration: 0.7 }, "-=0.55");
    });
    return () => ctx.revert();
  }, []);

  /* infinite marquee */
  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 26,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const goTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const visibleProjects = showAllProjects ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <div className="bg-[#EDE8DA] text-[#18140F] font-[IBM_Plex_Sans]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .font-body { font-family: 'IBM Plex Sans', system-ui, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes pcb-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>

      {/* ============================= NAV ============================= */}
      <nav className="sticky top-0 z-50 border-b border-[#D9D0B8] bg-[#EDE8DA]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => goTo("home")} className="font-display flex items-center gap-2 text-lg font-bold">
            <Cpu size={18} className="text-[#3F8F5F]" />
            {NAME.toLowerCase()}.dev
          </button>
          <ul className="hidden gap-8 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => goTo(n.id)}
                  className={`relative py-1 text-sm transition-colors ${
                    active === n.id ? "text-[#18140F]" : "text-[#5C5645] hover:text-[#18140F]"
                  }`}
                >
                  {n.label}
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#B5651D]"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#D9D0B8] bg-[#F6F2E7] md:hidden"
            >
              <ul className="px-5 pb-4">
                {NAV.map((n) => (
                  <li key={n.id} className="border-b border-[#D9D0B8]">
                    <button onClick={() => goTo(n.id)} className="w-full py-3.5 text-left text-base">
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ============================= HERO ============================= */}
      <header id="home" className="relative overflow-hidden">
        {/* dark / light split */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #EDE8DA 0%, #EDE8DA 42%, #16241C 58%, #16241C 100%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-20 pt-14 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:gap-6 md:pb-28 md:pt-20">
          {/* left: headline */}
          <div className="relative z-10">
            <p className="font-mono mb-3 text-sm text-[#B5651D]">Hi, I'm</p>
            <h1 ref={heroNameRef} className="font-display text-[clamp(3rem,10vw,5.5rem)] leading-[0.95]">
              {NAME}
            </h1>
            <p ref={heroSubRef} className="font-display mt-2 text-[clamp(1.6rem,5vw,2.4rem)] leading-tight text-[#5C5645]">
              fullstack developer &amp; robotics builder
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => goTo("work")}
                className="inline-flex items-center gap-2 rounded-sm border border-[#18140F] bg-[#18140F] px-5 py-3 text-sm text-[#EDE8DA] transition-transform hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#B5651D]"
              >
                View work
              </button>
              <button
                onClick={() => goTo("contact")}
                className="inline-flex items-center gap-2 rounded-sm border border-[#18140F] px-5 py-3 text-sm transition-transform hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#B5651D]"
              >
                Get in touch
              </button>
            </div>
          </div>

          {/* center: portrait, overlapping the seam */}
          <div
            ref={heroPortraitRef}
            className="relative z-10 mx-auto h-64 w-52 overflow-hidden rounded-sm border-2 border-[#EDE8DA] shadow-[8px_8px_0_rgba(181,101,29,0.35)] sm:h-80 sm:w-64 md:absolute md:left-1/2 md:top-1/2 md:h-[26rem] md:w-80 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <img src="/profile.jpg" alt={`Portrait of ${NAME}`} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* right: pitch card, sits on the dark half */}
        <div className="relative z-10 mx-auto -mt-4 max-w-6xl px-5 pb-16 sm:px-8 md:-mt-24 md:pb-24">
          <div ref={heroCardRef} className="font-mono ml-auto w-full max-w-xs rounded-md border-t-2 border-[#B5651D] bg-[#132019] p-6 text-[#F6F2E7]">
            <div className="mb-4 flex items-center justify-between border-b border-dashed border-[#F6F2E7]/20 pb-3 text-xs text-[#F6F2E7]/50">
              <span>pitch card</span>
              <Bot size={14} />
            </div>
            {[
              ["location", "Cavite, PH"],
              ["studying at", "DLSU – Dasmariñas"],
              ["building", "robots + web apps"],
              ["next up", "engineering, then a master's"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-dashed border-[#F6F2E7]/10 py-2.5 text-sm last:border-none">
                <span className="text-[#F6F2E7]/50">{k}</span>
                <span className="text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs text-[#5C5645] md:flex">
          <span>scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </header>

      {/* ====================== TECH MARQUEE ====================== */}
      <div className="overflow-hidden border-y border-[#D9D0B8] bg-[#F6F2E7] py-4">
        <div ref={marqueeTrackRef} className="flex w-max gap-4">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-mono flex shrink-0 items-center gap-2 rounded-full border border-[#D9D0B8] bg-[#EDE8DA] px-4 py-2 text-sm text-[#5C5645]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3F8F5F]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ====================== CAPABILITIES ====================== */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {CAPABILITIES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
              className="flex items-center gap-2 rounded-full border border-[#D9D0B8] bg-[#F6F2E7] px-5 py-3 shadow-[3px_3px_0_rgba(181,101,29,0.15)]"
            >
              <Icon size={16} className="text-[#B5651D]" />
              <span className="font-mono text-sm">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====================== SERVICES / EXPERTISE ====================== */}
      <section id="expertise" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <span className="font-mono inline-block rounded-full border border-[#D9D0B8] px-4 py-1.5 text-xs text-[#5C5645]">
          My services
        </span>
        <h2 className="font-display mt-4 text-[clamp(2.2rem,6vw,3.4rem)]">expertise</h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc, big }) => (
            <motion.div
              key={title}
              whileHover={{ y: -4 }}
              className={`flex flex-col justify-between rounded-md border border-[#D9D0B8] bg-[#F6F2E7] p-7 transition-shadow hover:shadow-[5px_5px_0_rgba(181,101,29,0.2)] ${
                big ? "sm:col-span-2 sm:row-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className={`mb-6 flex ${big ? "h-14 w-14" : "h-11 w-11"} items-center justify-center rounded-full bg-[#16241C]`}>
                <Icon size={big ? 24 : 19} className="text-[#3F8F5F]" />
              </div>
              <div>
                <h3 className="font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm text-[#5C5645]">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====================== PROCESS ====================== */}
      <section id="process" className="border-y border-[#D9D0B8] bg-[#F6F2E7] py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <span className="font-mono inline-block rounded-full border border-[#D9D0B8] px-4 py-1.5 text-xs text-[#5C5645]">
            My process
          </span>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,6vw,3.4rem)]">how I do my work</h2>

          <div className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-[repeating-linear-gradient(90deg,#B5651D_0_10px,transparent_10px_20px)] md:block" />
            {PROCESS.map(({ n, title, icon: Icon, desc }) => (
              <div key={n} className="relative">
                <div className="font-mono flex items-center gap-3 text-[#B5651D]">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#B5651D] bg-[#F6F2E7] text-sm">
                    {n}
                  </span>
                </div>
                <Icon size={20} className="mt-5 text-[#3F8F5F]" />
                <h3 className="font-display mt-3 text-xl">{title}</h3>
                <p className="mt-2 max-w-[32ch] text-sm text-[#5C5645]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== PROJECTS / WORK ====================== */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <span className="font-mono inline-block rounded-full border border-[#D9D0B8] px-4 py-1.5 text-xs text-[#5C5645]">
          Selected builds
        </span>
        <h2 className="font-display mt-4 text-[clamp(2.2rem,6vw,3.4rem)]">my works</h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {visibleProjects.map((p) => (
              <motion.article
                key={p.part}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 rounded-md border border-[#D9D0B8] bg-[#F6F2E7] p-6"
              >
                <div className="flex aspect-[16/9] w-full items-center justify-center rounded-sm bg-[#16241C]">
                  <span className="font-mono text-xs tracking-wide text-[#3F8F5F]">{p.part}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#5C5645]">{p.blurb}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono rounded-full border border-[#D9D0B8] px-3 py-1 text-[11px] text-[#5C5645]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-3 pt-1">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-[#18140F] bg-[#18140F] py-2 text-xs text-[#EDE8DA]"
                  >
                    <ExternalLink size={13} /> Live site
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-[#18140F] py-2 text-xs"
                  >
                    <Github size={13} /> GitHub
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {PROJECTS.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAllProjects((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-[#18140F] px-6 py-3 text-sm transition-transform hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#B5651D]"
            >
              {showAllProjects ? <Minus size={15} /> : <Plus size={15} />}
              {showAllProjects ? "Show less" : "Show more"}
            </button>
          </div>
        )}
        <p className="font-mono mt-6 text-xs text-[#5C5645]">
          // live-site links are placeholders — swap in real URLs in the PROJECTS array.
        </p>
      </section>

      {/* ====================== ABOUT ====================== */}
      <section id="about" className="border-t border-[#D9D0B8] bg-[#F6F2E7] py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,6vw,3.4rem)]">pushing boundaries</h2>
            <p className="mt-6 max-w-[58ch] text-[#5C5645]">
              I'm a student at De La Salle University – Dasmariñas who splits her time between
              circuit boards and codebases. As Robotics Captain and Research Head of Animo SPEAR,
              I lead competition robotics builds and the research behind them, and I founded the
              Green Patriots Mathematical Guild to give my schoolmates a space to actually enjoy
              math.
            </p>
            <p className="mt-4 max-w-[58ch] text-[#5C5645]">
              Outside of clubs, I build things that solve problems I can see in front of me — a
              student council portal that didn't need a vendor, an agricultural robot that tells
              wilting plants apart from healthy ones, a sumobot tuned sensor by sensor. My plan is
              engineering school, then a master's.
            </p>

            <div className="mt-10">
              <h3 className="font-mono flex items-center gap-2 text-sm text-[#5C5645]">
                <GraduationCap size={16} /> Experience
              </h3>
              <div className="mt-4 divide-y divide-[#D9D0B8] border-y border-[#D9D0B8]">
                {EXPERIENCE.map((e) => (
                  <div key={e.role + e.org} className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                    <div>
                      <p className="text-sm font-medium">{e.role}</p>
                      <p className="text-sm text-[#5C5645]">{e.org}</p>
                    </div>
                    <span className="font-mono text-xs text-[#B5651D]">{e.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs">
            <div className="overflow-hidden rounded-md border border-[#D9D0B8]">
              <img src="/profile.jpg" alt={`${NAME} portrait`} className="h-72 w-full object-cover" />
              <div className="flex items-center gap-2 border-t border-[#D9D0B8] bg-[#EDE8DA] px-4 py-3">
                <MapPin size={14} className="text-[#B5651D]" />
                <span className="font-mono text-xs text-[#5C5645]">Cavite, Philippines</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== CONTACT ====================== */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="relative overflow-hidden rounded-lg bg-[#132019] p-8 text-[#F6F2E7] sm:p-12">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)]">Let's make it happen.</h2>
          <p className="mt-3 max-w-[48ch] text-[#F6F2E7]/70">
            Open to robotics collaborations, research, and full-stack work. Reach out on
            whichever channel is easiest for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-sm bg-[#E08A34] px-5 py-3 text-sm text-[#132019] transition-transform hover:-translate-y-0.5"
            >
              <Mail size={16} /> Email
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-[#F6F2E7]/40 px-5 py-3 text-sm transition-transform hover:-translate-y-0.5"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              className="inline-flex items-center gap-2 rounded-sm border border-[#F6F2E7]/40 px-5 py-3 text-sm transition-transform hover:-translate-y-0.5"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={WHATSAPP_URL}
              className="inline-flex items-center gap-2 rounded-sm border border-[#F6F2E7]/40 px-5 py-3 text-sm transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href={FACEBOOK_URL}
              className="inline-flex items-center gap-2 rounded-sm border border-[#F6F2E7]/40 px-5 py-3 text-sm transition-transform hover:-translate-y-0.5"
            >
              <Facebook size={16} /> Facebook
            </a>
          </div>
        </div>
      </section>

      {/* ====================== FOOTER ====================== */}
      <footer className="relative overflow-hidden border-t border-[#D9D0B8] py-10">
        <p
          className="font-display pointer-events-none select-none text-center text-[18vw] leading-none text-[#18140F]/[0.04]"
          aria-hidden="true"
        >
          {NAME}
        </p>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center sm:px-8">
          <div className="font-mono flex items-center gap-1.5 text-xs text-[#5C5645]">
            <MapPin size={13} /> Cavite, Philippines
          </div>
          <p className="font-mono text-xs text-[#5C5645]">
            © {new Date().getFullYear()} {NAME}. Built from scratch, one commit at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
