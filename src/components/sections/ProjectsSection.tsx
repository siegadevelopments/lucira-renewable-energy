import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  location: string;
  capacity: string;
  image: string;
  type: string;
  savings: string;
}

const projects: Project[] = [
  {
    title: "Sunridge Corporate Campus",
    location: "Austin, Texas",
    capacity: "15 MW",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    type: "Commercial",
    savings: "40% energy reduction",
  },
  {
    title: "Green Valley Residence",
    location: "Phoenix, Arizona",
    capacity: "12 kW",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    type: "Residential",
    savings: "$2,400/year savings",
  },
  {
    title: "Pacific Industrial Park",
    location: "San Diego, California",
    capacity: "45 MW",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    type: "Industrial",
    savings: "60% carbon reduction",
  },
  {
    title: "Eastside Community Center",
    location: "Denver, Colorado",
    capacity: "500 kW",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80",
    type: "Municipal",
    savings: "Net-zero achieved",
  },
  {
    title: "Highland School District",
    location: "Portland, Oregon",
    capacity: "2.5 MW",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
    type: "Educational",
    savings: "85% grid independence",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[400px] group">
      <div className="relative h-[280px] rounded-2xl overflow-hidden mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-teal text-white text-xs font-inter font-medium rounded-full mb-2">
            {project.type}
          </span>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Zap className="w-4 h-4 text-amber" />
            <span>{project.capacity}</span>
          </div>
        </div>
      </div>
      
      <h3 className="font-poppins font-semibold text-xl text-navy mb-2 group-hover:text-teal transition-colors">
        {project.title}
      </h3>
      
      <div className="flex items-center gap-1 text-navy/60 text-sm mb-2">
        <MapPin className="w-4 h-4" />
        <span className="font-inter">{project.location}</span>
      </div>
      
      <div className="inline-flex items-center gap-1 text-teal text-sm font-inter font-medium">
        {project.savings}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Horizontal scroll
      if (scrollRef.current && containerRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth - containerRef.current.offsetWidth;
        
        gsap.to(scrollRef.current, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 bg-cool-gray relative overflow-hidden"
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <div ref={headerRef} className="max-w-[1280px] mx-auto px-6 lg:px-8 mb-12">
        <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal font-inter text-sm font-medium rounded-full mb-4">
          Featured Work
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-navy mb-4">
              Transforming Communities
            </h2>
            <p className="font-inter text-navy/70 max-w-xl">
              Explore our portfolio of successful solar installations across residential, commercial, and industrial sectors.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-teal font-inter font-medium hover:text-teal-dark transition-colors">
            View all projects
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 pl-6 lg:pl-[calc((100vw-1280px)/2+24px)]"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
          {/* Spacer for scroll end */}
          <div className="flex-shrink-0 w-16" />
        </div>
      </div>
    </section>
  );
}
