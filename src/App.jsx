import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// Importar imágenes Step by Step (Web)
import stepbystep1 from "./assets/img/stepbystep/2026-05-19-041342_1920x973_scrot.png";
import stepbystep2 from "./assets/img/stepbystep/2026-05-19-041354_1920x967_scrot.png";
import stepbystep3 from "./assets/img/stepbystep/2026-05-19-041429_1920x970_scrot.png";
import stepbystep4 from "./assets/img/stepbystep/2026-05-19-204452_1920x756_scrot.png";
import stepbystep5 from "./assets/img/stepbystep/2026-05-19-204507_1920x781_scrot.png";
import stepbystep6 from "./assets/img/stepbystep/2026-05-19-204521_1920x967_scrot.png";
import stepbystep7 from "./assets/img/stepbystep/2026-05-19-204538_1920x967_scrot.png";

// Importar imágenes HelpLink
import helplink1 from "./assets/img/helplink/help link.png";
import helplink2 from "./assets/img/helplink/help link2.png";
import helplink3 from "./assets/img/helplink/help link3.png";
import helplink4 from "./assets/img/helplink/help link4.png";

// Importar imágenes App Móvil Help Desk (vertical)
import helpdesk1 from "./assets/img/stepbystep-movil/start.jpeg";
import helpdesk2 from "./assets/img/stepbystep-movil/login.jpeg";
import helpdesk3 from "./assets/img/stepbystep-movil/login2.jpeg";
import helpdesk4 from "./assets/img/stepbystep-movil/objetivos.jpeg";
import helpdesk5 from "./assets/img/stepbystep-movil/calendario.jpeg";
import helpdesk6 from "./assets/img/stepbystep-movil/contrato.jpeg";
import helpdesk7 from "./assets/img/stepbystep-movil/lever.jpeg";
import helpdesk8 from "./assets/img/stepbystep-movil/preferencias horario.jpeg";
import helpdesk9 from "./assets/img/stepbystep-movil/notificacion push internal.jpeg";
import helpdesk10 from "./assets/img/stepbystep-movil/619b345e-8ed9-49fe-9fd4-fdc9bdc9be29.jpeg";
import helpdesk11 from "./assets/img/stepbystep-movil/63de98e5-8049-4511-bd91-c5e5dbbfd49f.jpeg";
import helpdesk12 from "./assets/img/stepbystep-movil/d6923aba-00a0-4416-9aab-280be28ae0e7.jpeg";

// Importar imágenes Manga Dex
import mangadex1 from "./assets/img/mangadex/453d3760-fcbb-4b8d-a33b-951cc65838a3.jpeg";
import mangadex2 from "./assets/img/mangadex/7fb26c2e-66d1-42de-b27b-b2d522c606e4.jpeg";
import mangadex3 from "./assets/img/mangadex/8f1a2068-f0a5-4011-a33c-8152c27192d6.jpeg";
import mangadex4 from "./assets/img/mangadex/bd35c9ac-e952-48ef-bae4-c88a2fa2b3b6.jpeg";

// Placeholder images using a seeded color per project slide
function placeholderImg(seed, label) {
  const colors = ["1a1a18", "181816", "141412", "1c1c1a", "161614"];
  const accent = ["C8A96E", "8FA89B", "A89B8F", "9B8FA8", "8F9BA8"];
  const c = colors[seed % colors.length];
  const a = accent[seed % accent.length];
  return `https://placehold.co/900x500/${c}/${a}?text=${encodeURIComponent(label)}`;
}

const projects = [
  {
    id: 1,
    name: "Guardian Angel",
    tag: "Security · Full Stack",
    desc: "Sistema de monitoreo y alertas en tiempo real, para guarderias",
    stack: ["Django", "React", "WebSockets", "PostgreSQL"],
    color: "#C8A96E",
    images: [
      placeholderImg(0, "Guardian Angel — Dashboard"),
      placeholderImg(1, "Guardian Angel — Mapa en vivo"),
      placeholderImg(2, "Guardian Angel — Alertas"),
    ],
    repo: "https://github.com/BrayanAlv/Api-Flask-Angel-Care",
    live: "#",
  },
  {
    id: 2,
    name: "Step by Step",
    tag: "Mobile · Front end · Backend",
    desc: "Plataforma web admin de step by step, para la gestion de rutinas, usuarios, frases, categorias, membresias, etc.",
    stack: ["Fast API", "Notificaciones Push FCM", "Stripe", "React", "flutter"],
    color: "#8FA89B",
    images: [stepbystep1, stepbystep2, stepbystep3, stepbystep4, stepbystep5, stepbystep6, stepbystep7],
    repo: "https://github.com/BrayanAlv/step_by_step",
    live: "https://stepbystep.cv/",
  },

  {
    id: 3,
    name: "HelpLink",
    tag: "Full Stack",
    desc: "Plataforma web para ubicacion y gestión de tickets de soporte, chat en vivo y base de conocimientos centralizada.",
    stack: ["Next.js", "GraphQL", "Docker", "Kubernetes"],
    color: "#A89B8F",
    images: [helplink1, helplink2, helplink3, helplink4],
    repo: "https://github.com/BrayanAlv/HdeskRN",
    live: "#",
  },

  {
    id: 4,
    name: "Step by Step movil",
    tag: "Mobile · API",
    desc: "Plataforma para gestion y seguimiento de habitos personales, con app movil y dashboard web para visualizacion de progreso, con sistema de notificaciones push FCM para motivar a los usuarios a cumplir sus objetivos.",
    stack: ["React Native", "JS", "MySQL", "Firebase FCM", "C# ASP.Net"],
    color: "#9B8FA8",
    images: [helpdesk1, helpdesk2, helpdesk3, helpdesk4, helpdesk5, helpdesk6, helpdesk7, helpdesk8, helpdesk9, helpdesk10, helpdesk11, helpdesk12],
    repo: "",
    live: "#",
  },
  {
    id: 5,
    name: "Manga dex App",
    tag: "Front end ",
    desc: "Plataforma Web que consume API rest de MangaDex, para busqueda y lectura de manga",
    stack: ["React", "JS", "CSS"],
    color: "#8F9BA8",
    images: [mangadex1, mangadex2, mangadex3, mangadex4],
    repo: "https://github.com/BrayanAlv/mangadex-app",
    live: "https://manga.brayanalvz.xyz/",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setInView(true); },
        { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <span className="nav-logo">PortFolio Web Site</span>
        <ul className="nav-links">
          {["inicio", "sobre", "proyectos", "contacto"].map((s) => (
              <li key={s}>
                <a href={`#${s}`} className={active === s ? "active" : ""}>{s}</a>
              </li>
          ))}
        </ul>
      </nav>
  );
}

function Hero() {
  return (
      <section id="inicio" className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb--1" />
          <div className="hero-orb hero-orb--2" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Full Stack &amp; Backend Developer</p>
          <h1 className="hero-title">
            Construyo sistemas<br />
            <span className="hero-title--accent">que perduran.</span>
          </h1>
          <p className="hero-sub">
            Arquitecturas limpias. APIs robustas. Experiencias sin fricción.
          </p>
          <div className="hero-cta">
            <a href="#proyectos" className="btn btn--primary">Ver proyectos</a>
            <a href="#contacto" className="btn btn--ghost">Contactar</a>
          </div>
        </div>
        <div className="hero-badge">
          <span>5</span>
          <small>proyectos<br />destacados</small>
        </div>
      </section>
  );
}

function About() {
  const [ref, inView] = useInView();
  return (
      <section id="sobre" className="about">
        <div ref={ref} className={`about-inner ${inView ? "reveal" : ""}`}>
           <div className="about-text">
             <span className="section-tag">01 — Sobre mí</span>
             <h2 className="section-title">Código con<br />propósito.</h2>
             <p>
               Desarrollo y Gestión de Software con experiencia en desarrollo de aplicaciones web, APIs REST y soluciones IoT. Con conocimientos en JavaScript, PHP, Java, Python y ASP.NET, así como en bases de datos MySQL y despliegue en entornos cloud (AWS y Google Cloud), participando en el ciclo completo de desarrollo de software.
             </p>
             <p>
               <strong>EXPERIENCIA</strong><br />
               <strong>Prestador de Servicios Externo, Agencia Digital Baja California</strong> (Nov 2024 a Dic 2025)<br />
               Diseño, desarrollo y mantenimiento de plataformas web internas y públicas utilizando JavaScript y PHP. Integración de APIs REST y manejo de autenticación. Soporte técnico e implementación de procedimientos almacenados y triggers en bases de datos.
             </p>
            <div className="skills-row">
              {["JavaScript", "Java", "PHP", "ASP.NET", "C#", "Python", "React", "React Native", "Flutter", "MySQL", "PostgreSQL", "MongoDB", "AWS", "Google Cloud", "Docker", "REST / GraphQL"].map((s) => (
                   <span key={s} className="skill-chip">{s}</span>
               ))}
            </div>
          </div>
           <div className="about-stats">
             {[["Ing.", "Desarrollo y Gestión de Software"], ["15+", "tecnologías dominadas"], ["1", "certificación profesional"]].map(([n, l]) => (
                 <div key={n} className="stat">
                   <span className="stat-n">{n}</span>
                   <span className="stat-l">{l}</span>
                 </div>
             ))}
           </div>
        </div>
      </section>
  );
}

/* ── Modal con carrusel ──────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(null); // "next" | "prev"
  const [animating, setAnimating] = useState(false);
  const touchStart = useRef(null);

  const go = useCallback(
      (delta) => {
        if (animating) return;
        const next = (current + delta + project.images.length) % project.images.length;
        setDir(delta > 0 ? "next" : "prev");
        setAnimating(true);
        setTimeout(() => {
          setCurrent(next);
          setAnimating(false);
          setDir(null);
        }, 320);
      },
      [animating, current, project.images.length]
  );

  // Keyboard nav
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Touch swipe
  function onTouchStart(e) { touchStart.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStart.current = null;
  }

  return (
      <div className="modal-overlay" onClick={onClose}>
        <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ "--modal-accent": project.color }}
        >
          {/* Header */}
          <div className="modal-header">
            <div>
              <span className="modal-tag">{project.tag}</span>
              <h2 className="modal-title">{project.name}</h2>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
          </div>

          {/* Carrusel */}
          <div
              className="carousel"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
          >
            <div className={`carousel-track ${dir ? `carousel-track--${dir}` : ""}`}>
              <img
                  key={current}
                  src={project.images[current]}
                  alt={`${project.name} — captura ${current + 1}`}
                  className="carousel-img"
              />
            </div>

            <button className="carousel-btn carousel-btn--prev" onClick={() => go(-1)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="carousel-btn carousel-btn--next" onClick={() => go(1)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="carousel-dots">
              {project.images.map((_, i) => (
                  <button
                      key={i}
                      className={`dot ${i === current ? "dot--active" : ""}`}
                      onClick={() => go(i - current)}
                      aria-label={`Imagen ${i + 1}`}
                  />
              ))}
            </div>

            {/* Counter */}
            <span className="carousel-counter">
            {current + 1} / {project.images.length}
          </span>
          </div>

          {/* Info */}
           <div className="modal-body">
             <p className="modal-desc">{project.desc}</p>
             <div className="modal-stack">
               {project.stack.map((t) => (
                   <span key={t} className="modal-chip">{t}</span>
               ))}
             </div>
             <div className="modal-links">
               {project.repo && project.repo !== "#" && (
                   <a href={project.repo} target="_blank" rel="noopener noreferrer" className="modal-link-btn modal-link-repo">
                     <span>→</span> Repositorio
                   </a>
               )}
               {project.live && project.live !== "#" && (
                   <a href={project.live} target="_blank" rel="noopener noreferrer" className="modal-link-btn modal-link-live">
                     <span>→</span> Ver en vivo
                   </a>
               )}
             </div>
           </div>
        </div>
      </div>
  );
}

function Projects() {
  const [ref, inView] = useInView(0.05);
  const [selected, setSelected] = useState(null);

  return (
      <>
        <section id="proyectos" className="projects">
           <div className="projects-header">
             <span className="section-tag">02 — Proyectos</span>
             <h2 className="section-title">Portfolio.</h2>
           </div>
          <div ref={ref} className={`projects-grid ${inView ? "reveal" : ""}`}>
            {projects.map((p, i) => (
                <article
                    key={p.id}
                    className="card"
                    style={{ "--card-accent": p.color, "--delay": `${i * 80}ms` }}
                    onClick={() => setSelected(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(p)}
                >
                  <div className="card-top">
                    <span className="card-tag">{p.tag}</span>
                    <span className="card-num">0{p.id}</span>
                  </div>
                  <h3 className="card-name">{p.name}</h3>
                  <p className="card-desc">{p.desc}</p>
                   <div className="card-stack">
                     {p.stack.map((t) => <span key={t}>{t}</span>)}
                   </div>
                   <div className="card-actions">
                     <span className="card-cta" onClick={() => setSelected(p)}>Ver capturas →</span>
                     {p.repo && p.repo !== "#" && (
                         <a href={p.repo} target="_blank" rel="noopener noreferrer" className="card-link">Repositorio</a>
                     )}
                     {p.live && p.live !== "#" && (
                         <a href={p.live} target="_blank" rel="noopener noreferrer" className="card-link">Ver en vivo</a>
                     )}
                   </div>
                </article>
            ))}
          </div>
        </section>

        {selected && (
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  function handle(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
      <section id="contacto" className="contact">
        <div ref={ref} className={`contact-inner ${inView ? "reveal" : ""}`}>
           <div className="contact-left">
             <span className="section-tag">03 — Contacto</span>
             <h2 className="section-title">Conectemos<br />contigo.</h2>
             <p>
               <strong>Dirección:</strong><br />
               Vicente Guerrero, Colonia Mariano Matamoros<br />
               Tijuana, Baja California 9408
             </p>
             <p>
               <strong>Teléfono:</strong><br />
               <a href="tel:6641899448" className="contact-email">664 189 9448</a><br />
               <a href="tel:6641220276" className="contact-email">664 122 0276</a>
             </p>
             <a href="mailto:brayanalvzdev@gmail.com" className="contact-email">
               brayanalvzdev@gmail.com
             </a>
           </div>

        </div>
      </section>
  );
}

function Footer() {
  return (
      <footer className="footer">
        <span>© 2026 — Full Stack Developer</span>
        <span>Diseñado y desarrollado con precisión.</span>
      </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
        },
        { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
      <>
        <Nav active={active} />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </>
  );
}