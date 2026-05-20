import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

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
  },
  {
    id: 2,
    name: "Step by Step",
    tag: "Mobile · Front end · Backend",
    desc: "Plataforma para gestion y seguimiento de habitos personales, con app movil y dashboard web para visualizacion de progreso, con sistema de notificaciones push FCM para motivar a los usuarios a cumplir sus objetivos.",
    stack: ["Fast API", "Notificaciones Push FCM", "Stripe", "React", "flutter"],
    color: "#8FA89B",
    images: [
      placeholderImg(3, "Step by Step — Ruta de aprendizaje"),
      placeholderImg(4, "Step by Step — Progreso"),
      placeholderImg(0, "Step by Step — Perfil"),
    ],
  },
  {
    id: 3,
    name: "HelpLink",
    tag: "Full Stack",
    desc: "Plataforma web para ubicacion de ",
    stack: ["Next.js", "GraphQL", "Docker", "Kubernetes"],
    color: "#A89B8F",
    images: [
      placeholderImg(2, "HelpLink — Tickets"),
      placeholderImg(3, "HelpLink — Chat en vivo"),
      placeholderImg(4, "HelpLink — Base de conocimientos"),
    ],
  },
  {
    id: 4,
    name: "App Móvil Help Desk",
    tag: "Mobile · API",
    desc: "Aplicación móvil para gestión de incidencias y por medio de push notifications y dashboard con métricas en tiempo real.",
    stack: ["React Native", "JS", "MySQL", "Firebase FCM", "C# ASP.Net"],
    color: "#9B8FA8",
    images: [
      placeholderImg(1, "Help Desk — Incidencias"),
      placeholderImg(2, "Help Desk — Métricas"),
      placeholderImg(3, "Help Desk — Notificaciones tipo Push FCM"),
    ],
  },
  {
    id: 5,
    name: "Manga dex App",
    tag: "Front end ",
    desc: "Plataforma Web que consume API rest de MangaDex, para busqueda y lectura de manga",
    stack: ["React", "JS", "CSS"],
    color: "#8F9BA8",
    images: [
      placeholderImg(4, "Mandex — Reportes"),
      placeholderImg(0, "Mandex — Pagos"),
      placeholderImg(1, "Mandex — Reglas de negocio"),
    ],
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
             {[["Brayan Alvarez"], ["Ing.", "Desarrollo y Gestión de Software"]].map(([n, l]) => (
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
                  <span className="card-cta">Ver capturas →</span>
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