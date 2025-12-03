import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ViewTransitionLink from "./components/ViewTransitionLink";

// --- DATA (same as App.jsx) ---
const PROJECTS = [
  {
    id: 1,
    title: "Fintech Evolution",
    role: "Product Strategy",
    year: "2024",
    tags: ["UX Research", "Mobile"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    description: "Led the complete redesign of a mobile fintech platform serving over 500K users. Conducted extensive UX research including 50+ user interviews and usability testing sessions to identify pain points in the existing flow.",
    challenge: "The existing app had a 45% drop-off rate during the onboarding process, and users struggled with complex financial terminology and navigation.",
    solution: "Implemented a progressive disclosure design pattern, simplified the onboarding to 3 steps (down from 7), and introduced contextual help with plain language explanations. Created a design system that reduced development time by 30%.",
    results: [
      "Increased onboarding completion by 60%",
      "User satisfaction score improved from 3.2 to 4.6/5",
      "Monthly active users grew by 25% within 3 months of launch",
      "Reduced customer support tickets by 40%"
    ],
    technologies: ["React Native", "Firebase", "Figma", "Mixpanel"],
  },
  {
    id: 2,
    title: "Orbit Dashboard",
    role: "Lead PM",
    year: "2023",
    tags: ["SaaS", "B2B", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    description: "Launched a comprehensive analytics dashboard for B2B SaaS customers, providing real-time insights into their data pipelines and system performance.",
    challenge: "Enterprise clients needed a unified view of their distributed systems but were using 5-6 different tools, leading to fragmented insights and high operational costs.",
    solution: "Built a centralized dashboard with customizable widgets, real-time data streaming, and intelligent alerting. Worked closely with engineering to optimize query performance for large datasets (10M+ records).",
    results: [
      "Consolidated 6 tools into 1 unified platform",
      "Reduced average query time from 45s to 2.3s",
      "Achieved 95% customer adoption within 6 months",
      "$2.4M in additional ARR from upsells"
    ],
    technologies: ["Vue.js", "GraphQL", "PostgreSQL", "Redis", "AWS"],
  },
  {
    id: 3,
    title: "Velvet Commerce",
    role: "Product Owner",
    year: "2023",
    tags: ["E-commerce", "Conversion"],
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    description: "Revamped the checkout experience for a luxury e-commerce platform, focusing on conversion optimization and reducing cart abandonment.",
    challenge: "Cart abandonment rate was at 78%, significantly above industry average of 70%. Mobile conversion was particularly poor at 1.2%.",
    solution: "Redesigned the entire checkout flow with a mobile-first approach, implemented one-click checkout for returning customers, added multiple payment options including digital wallets, and optimized page load times.",
    results: [
      "Reduced cart abandonment to 62%",
      "Mobile conversion increased to 3.8%",
      "Average order value increased by 18%",
      "Page load time improved from 4.2s to 1.1s"
    ],
    technologies: ["Next.js", "Stripe", "Shopify", "Tailwind CSS"],
  },
  {
    id: 4,
    title: "Neural Core",
    role: "Technical PM",
    year: "2022",
    tags: ["AI/ML", "Infrastructure"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    description: "Built the foundational infrastructure for a machine learning platform that enables data scientists to train, deploy, and monitor ML models at scale.",
    challenge: "Data science teams were spending 60% of their time on infrastructure setup and deployment instead of model development. No standardized way to deploy models to production.",
    solution: "Created a self-service ML platform with automated model training pipelines, containerized deployments, and integrated monitoring. Established MLOps best practices and documentation.",
    results: [
      "Reduced time-to-production from 3 weeks to 2 days",
      "Enabled 15 data scientists to deploy 50+ models in 6 months",
      "Infrastructure costs reduced by 35% through auto-scaling",
      "Model performance monitoring improved incident response by 80%"
    ],
    technologies: ["Python", "Kubernetes", "TensorFlow", "Docker", "Prometheus"],
  },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === parseInt(id));

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <ViewTransitionLink to="/" className="text-blue-600 hover:underline">
            Back to Home
          </ViewTransitionLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F0] text-[#1A1A1A] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />

        {/* Back Button */}
        <ViewTransitionLink
          to="/"
          className="absolute top-6 left-6 md:top-12 md:left-12 flex items-center gap-2 text-white hover:opacity-70 transition-opacity z-10"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </ViewTransitionLink>

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-white/40 rounded-full px-3 py-1 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-200">
              {project.role} • {project.year}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Overview */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Overview</h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              {project.description}
            </p>
          </div>

          {/* Challenge */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Challenge</h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solution</h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              {project.solution}
            </p>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Results</h2>
            <ul className="space-y-3">
              {project.results.map((result, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 text-lg text-gray-700"
                >
                  <span className="text-2xl">✓</span>
                  <span>{result}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-[#1A1A1A] text-white rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-300 py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interested in working together?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how I can help bring your product vision to life.
          </p>
          <ViewTransitionLink
            to="/#contact"
            className="inline-block bg-[#1A1A1A] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </ViewTransitionLink>
        </div>
      </section>
    </div>
  );
}
