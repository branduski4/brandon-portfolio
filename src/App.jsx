import React, { useState, useEffect, useRef } from "react";
import ViewTransitionLink from "./components/ViewTransitionLink";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Copy,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

// --- DATA ---
const PROJECTS = [
  {
    id: 1,
    title: "Fintech Evolution",
    role: "Product Strategy",
    year: "2024",
    tags: ["UX Research", "Mobile"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Orbit Dashboard",
    role: "Lead PM",
    year: "2023",
    tags: ["SaaS", "B2B", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Velvet Commerce",
    role: "Product Owner",
    year: "2023",
    tags: ["E-commerce", "Conversion"],
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Neural Core",
    role: "Technical PM",
    year: "2022",
    tags: ["AI/ML", "Infrastructure"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
  },
];

const EXPERIENCE = [
  {
    company: "Petco",
    role: "Digital Product Manager",
    period: "Aug 2025 — Present",
    description:
      "Digital Product Manager | Item & Merchandising Operations Lead product strategy for enterprise PIM systems managing 300K-400K SKUs annually at Petco. Oversee Product Information Management, vendor contract management, and onboarding portals serving 300+ vendors across 15+ user roles. Drive system modernization, including migration to Bamboo Rose TotalPLM. Partner with cross-functional teams to optimize workflows, develop PRDs, and enhance platform performance through stakeholder alignment and data-driven improvements",
  },
  {
    company: "Triagons",
    role: "Product Owner",
    period: "Nov 2023 —  Aug 2025",
    description:
      "Product Owner | Triagons Drove Agile adoption through SCRUM/Kanban methodologies, boosting development velocity 56%. Managed complete product strategy for medical software portfolio (Anestesys, Interfaz, Annexio) across Anesthesiology, Operating Room, and Nursing units, winning enterprise agreements with IMSS, ISSSTE, and Grupo Ángeles. Championed Anestesys transformation to cloud-based SaaS solution. Executed user research, shaped product vision, and leveraged MoSCoW/RICE prioritization methods. Coordinated sprint ceremonies and maintained cross-functional stakeholder engagement.",
  },
  {
    company: "Biossmann",
    role: "Product Owner",
    period: "2021 — 2023",
    description:
      "Product Owner | Biossmann Led Agile transformation implementing SCRUM/Kanban frameworks, increasing development efficiency 56%. Owned product roadmap for medical software suite (Anestesys, Interfaz, Annexio) serving Anesthesiology, OR, and Nursing departments, securing major contracts with IMSS, ISSSTE, and Grupo Ángeles. Spearheaded Anestesys migration to web-based SaaS platform. Conducted user research, defined product strategy, and applied MoSCoW/RICE prioritization frameworks. Facilitated all scrum ceremonies and managed stakeholder alignment throughout product lifecycle.",
  },
  {
    company: "Biossmann",
    role: "Project Lead",
    period: "2019 — 2021",
    description:
      "Created detailed user and technical documentation supporting project delivery and knowledge transfer, driving revenue growth. Enhanced Interfaz software's medical equipment communication protocols for operating room environments through requirements workshops with engineering and clinical teams, strengthening market position and customer satisfaction. Leveraged JIRA for sprint management and backlog tracking, Adobe XD for wireframing/prototyping, Miro for collaborative story-mapping, and Notion for documentation organization across agile delivery cycles.",
  },
];

// --- COMPONENTS ---

// 1. Magnetic Button Component
const MagneticButton = ({ children, className, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`${className} relative overflow-hidden group`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-gray-900 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out -z-0 opacity-10" />
    </motion.button>
  );
};

// 2. Navbar (Sticky & Smart)
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      // FIX: Ensure bezier curve values for X (1st and 3rd) are between 0 and 1
      transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
      className="fixed top-0 left-0 right-0 z-40 px-3 py-4 md:px-6 md:py-6 mix-blend-difference text-[#F5F5F0] flex justify-between items-center gap-2"
    >
      <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-tighter whitespace-nowrap">
        BRANDON VIZCARRA T.
      </span>
      <div className="flex gap-3 sm:gap-6 md:gap-8 text-xs sm:text-sm font-medium tracking-tight">
        <a href="#projects" className="hover:opacity-50 transition-opacity">
          Work
        </a>
        <a href="#about" className="hover:opacity-50 transition-opacity">
          About
        </a>
        <a href="#contact" className="hover:opacity-50 transition-opacity">
          Contact
        </a>
      </div>
    </motion.nav>
  );
};

// 3. Abstract Shapes Component for Hero Background
const AbstractShapes = () => {
  const shapes = [
    {
      id: 1,
      className:
        "w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/60 to-indigo-600/60 blur-[100px]",
      initial: { x: -100, y: -100, rotate: 0, scale: 0.8 },
      animate: { 
        x: [0, 100, -50, 0], 
        y: [0, -50, 100, 0], 
        rotate: [0, 45, -45, 0], 
        scale: [1, 1.2, 0.9, 1] 
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    {
      id: 2,
      className:
        "w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-500/50 to-rose-500/50 blur-[120px]",
      initial: { x: 200, y: 100, rotate: 10, scale: 0.7 },
      animate: { 
        x: [0, -100, 50, 0], 
        y: [0, 100, -50, 0], 
        rotate: [10, -20, 20, 10], 
        scale: [1, 1.1, 0.8, 1] 
      },
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      },
    },
    {
      id: 3,
      className:
        "w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-blue-400/50 to-cyan-400/50 blur-[90px]",
      initial: { x: -300, y: 200, rotate: -5, scale: 0.9 },
      animate: { 
        x: [0, 150, -100, 0], 
        y: [0, -100, 50, 0], 
        rotate: [-5, 15, -15, -5], 
        scale: [1, 0.9, 1.1, 1] 
      },
      transition: {
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      },
    },
    {
      id: 4,
      className:
        "w-80 h-80 rounded-full bg-gradient-to-br from-amber-300/50 to-orange-400/50 blur-[80px]",
      initial: { x: 150, y: -200, rotate: 15, scale: 0.6 },
      animate: {
        x: [0, -80, 80, 0],
        y: [0, 80, -80, 0],
        rotate: [15, -10, 25, 15],
        scale: [1, 1.3, 0.8, 1],
      },
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      },
    },
    {
      id: 5,
      className:
        "w-64 h-64 rounded-full bg-gradient-to-r from-emerald-400/40 to-teal-500/40 blur-[70px]",
      initial: { x: 0, y: 0, rotate: 0, scale: 0.5 },
      animate: {
        x: [0, 120, -120, 0],
        y: [0, -120, 120, 0],
        rotate: [0, 60, -60, 0],
        scale: [0.5, 1, 0.5, 0.5],
      },
      transition: {
        duration: 28,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 4,
      },
    },
    {
      id: 6,
      className:
        "w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-violet-500/30 to-fuchsia-500/30 blur-[150px]",
      initial: { x: 0, y: 0, rotate: 0, scale: 1 },
      animate: {
        x: [0, -50, 50, 0],
        y: [0, 50, -50, 0],
        scale: [1, 1.1, 0.9, 1],
      },
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0,
      },
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`${shape.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          initial={shape.initial}
          animate={shape.animate}
          transition={shape.transition}
        />
      ))}
    </div>
  );
};

// NEW: Rotating Text Component for Kinetic Typography
const ROTATING_WORDS = [
  "STRATEGY",
  "INNOVATION",
  "EXECUTION",
  "VISION",
  "DISCOVERY",
];

const RotatingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ROTATING_WORDS.length);
    }, 2500); // Change word every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    // FIX: Changed from 'div' to 'span' to avoid validateDOMNesting error (div inside p)
    <span className="inline-flex overflow-hidden h-6 md:h-8 align-top">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          // FIX: Corrected bezier curve, X values must be within [0, 1]
          transition={{ duration: 0.5, ease: [0.6, 0.01, 0.05, 0.95] }}
          className="text-lg md:text-xl font-bold tracking-widest text-[#1A1A1A]"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// --- MAIN APP COMPONENT ---
export default function Portfolio() {
  const [copied, setCopied] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dot Grid Background for Hero - CSS Definition
  const dotGridStyle = {
    backgroundImage: `radial-gradient(#1A1A1A 1px, transparent 0)`,
    backgroundSize: "20px 20px",
    animation: "dot-scroll 60s linear infinite",
  };

  // Injecting the keyframe animation
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes dot-scroll {
        from { background-position: 0 0; }
        to { background-position: 2000px 2000px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-[#F5F5F0] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-[#F5F5F0] overflow-x-hidden min-h-screen cursor-default">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
        {/* Animated Dot Grid Overlay */}
        <div
          className="absolute inset-0 opacity-5 mix-blend-overlay z-0"
          style={dotGridStyle}
        />

        {/* Abstract Shapes Background */}
        <AbstractShapes />

        <div className="max-w-[90vw] z-10 relative">
          {" "}
          {/* z-10 for text to be above shapes */}
          {/* New Kinetic Typography Element */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-4 text-sm md:text-lg font-mono tracking-widest text-gray-700"
          >
            FOCUS ON <RotatingText />
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            {/* Split text animation */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-[13vw] leading-[0.85] font-bold tracking-tighter uppercase"
                variants={{
                  hidden: { y: 100 },
                  visible: {
                    y: 0,
                    // FIX: Corrected bezier curve
                    transition: { duration: 1, ease: [0.6, 0.01, 0.05, 0.95] },
                  },
                }}
              >
                Product
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-[13vw] leading-[0.85] font-bold tracking-tighter uppercase text-[#1A1A1A]/90"
                variants={{
                  hidden: { y: 100 },
                  visible: {
                    y: 0,
                    // FIX: Corrected bezier curve
                    transition: { duration: 1, ease: [0.6, 0.01, 0.05, 0.95] },
                  },
                }}
              >
                Manager
              </motion.h1>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 md:mt-24 max-w-xl text-lg md:text-xl font-light leading-relaxed text-gray-600"
          >
            Bridging tech, users, and business. I build digital experiences that
            make sense at scale.
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs uppercase tracking-widest writing-vertical-rl">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={20} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="py-32 px-6 md:px-12 border-t border-gray-300"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Selected
            <br />
            Works
          </h2>
          <span className="text-sm font-mono text-gray-500 mt-4 md:mt-0">
            (2022 — 2024)
          </span>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <ViewTransitionLink
              key={project.id}
              to={`/project/${project.id}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative border-t border-gray-300 py-12 md:py-16 transition-colors hover:bg-[#EAEAE5] cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 mt-4 md:mt-0 group-hover:-translate-x-4 transition-transform duration-500 ease-out">
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs border border-gray-400 rounded-full px-2 py-1 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-lg font-light md:w-32 text-right">
                      {project.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </ViewTransitionLink>
          ))}
          <div className="border-t border-gray-300" />
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        id="about"
        className="py-32 px-6 md:px-12 bg-[#1A1A1A] text-[#F5F5F0]"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
            The Journey
          </h2>

          <div className="relative pl-8 md:pl-0">
            {/* Experience Items */}
            <div className="relative flex flex-col gap-12 md:gap-24">
              {/* SVG Line Animation */}
              <svg
                className="absolute top-0 left-0 md:left-[19px] w-1 h-full hidden md:block"
                viewBox="0 0 2 100"
                preserveAspectRatio="none"
                style={{ maxHeight: "100%" }}
              >
                <motion.path
                  d="M 1 0 V 1000"
                  stroke="#444"
                  strokeWidth="2"
                  fill="none"
                />
                <motion.path
                  d="M 1 0 V 1000"
                  stroke="#F5F5F0"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>

              {EXPERIENCE.map((job, index) => {
                const ExperienceItem = () => {
                  const [isExpanded, setIsExpanded] = useState(false);
                  const shouldTruncate = job.description.length > 150;

                  return (
                    <div key={index} className="relative md:pl-12 group">
                      {/* Dot on timeline */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="absolute left-[15px] top-3 w-3 h-3 bg-[#F5F5F0] rounded-full hidden md:block z-10"
                      />

                      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                        <h3 className="text-3xl font-bold">{job.company}</h3>
                        <span className="font-mono text-gray-400">
                          {job.period}
                        </span>
                      </div>

                      <h4 className="text-xl text-gray-300 mb-4">{job.role}</h4>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        whileInView={{ height: "auto", opacity: 1 }}
                        viewport={{ once: true }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-400 leading-relaxed font-light max-w-2xl">
                          {/* Mobile: show truncated or full based on state */}
                          <span className="md:hidden">
                            {isExpanded || !shouldTruncate
                              ? job.description
                              : `${job.description.substring(0, 150)}...`}
                          </span>
                          {/* Desktop: always show full */}
                          <span className="hidden md:inline">
                            {job.description}
                          </span>
                        </p>

                        {/* See more/less button - only on mobile and only if text is long */}
                        {shouldTruncate && (
                          <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="md:hidden mt-2 text-[#F5F5F0] text-sm font-medium hover:text-gray-300 transition-colors underline"
                          >
                            {isExpanded ? "See less" : "See more"}
                          </button>
                        )}
                      </motion.div>
                    </div>
                  );
                };

                return <ExperienceItem key={index} />;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 bg-[#F5F5F0]"
      >
        <div>
          <h2 className="text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase mb-8">
            Let's
            <br />
            Talk
          </h2>
          <p className="text-xl md:text-2xl font-light max-w-xl text-gray-600">
            ¿Buscas escalar tu producto o redefinir tu estrategia? Actualmente
            abierto a nuevos retos.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-4 relative">
            <MagneticButton
              className="bg-[#1A1A1A] text-white px-4 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full text-sm md:text-base lg:text-lg font-medium w-fit shadow-xl"
              onClick={() => {
                navigator.clipboard.writeText("brandonviztir04@gmail.com");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">brandonviztir04@gmail.com</span>
              <Copy className="w-3 h-3 md:w-4 md:h-4 opacity-50 ml-2" />
            </MagneticButton>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-12 left-0 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-8 items-center">
            <a
              href="#"
              className="group flex items-center gap-1 font-medium hover:text-gray-500 transition-colors"
            >
              LINKEDIN
              <motion.span whileHover={{ x: 3, y: -3 }}>
                <ArrowUpRight size={18} />
              </motion.span>
            </a>
            <a
              href="#"
              className="group flex items-center gap-1 font-medium hover:text-gray-500 transition-colors"
            >
              TWITTER
              <motion.span whileHover={{ x: 3, y: -3 }}>
                <ArrowUpRight size={18} />
              </motion.span>
            </a>
          </div>
        </div>

        <div className="w-full text-center mt-24 text-xs font-mono text-gray-400 uppercase tracking-widest">
          Brandon Vizcarra T 💙
        </div>
      </section>

      {/* NOISE OVERLAY FOR TEXTURE */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[60] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  );
}
