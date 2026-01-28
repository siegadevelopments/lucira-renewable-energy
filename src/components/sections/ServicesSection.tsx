import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Building, Factory, Battery, Sun, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

function ServiceCard({ icon, title, description, featured }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer
        ${featured 
          ? "bg-navy text-white md:row-span-2" 
          : "bg-white hover:shadow-xl hover:-translate-y-2"
        }`}
    >
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-colors duration-300
          ${featured 
            ? "bg-amber/20 text-amber" 
            : "bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white"
          }`}
      >
        {icon}
      </div>
      
      <h3 className={`font-poppins font-semibold text-xl mb-3 ${featured ? "text-white" : "text-navy"}`}>
        {title}
      </h3>
      
      <p className={`font-inter text-sm leading-relaxed ${featured ? "text-white/80" : "text-navy/70"}`}>
        {description}
      </p>

      {featured && (
        <div className="absolute bottom-8 left-8 right-8">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-amber rounded-full" />
          </div>
          <span className="block mt-2 text-xs text-white/60 font-inter">Most popular service</span>
        </div>
      )}
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Cards staggered animation
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <Home className="w-7 h-7" />,
      title: "Residential Solar",
      description: "Transform your home with custom solar installations that reduce energy costs and increase property value.",
      featured: true,
    },
    {
      icon: <Building className="w-7 h-7" />,
      title: "Commercial Solutions",
      description: "Scalable solar systems designed for businesses to minimize operational costs and meet sustainability goals.",
    },
    {
      icon: <Factory className="w-7 h-7" />,
      title: "Industrial Projects",
      description: "Large-scale solar installations for manufacturing facilities and industrial complexes.",
    },
    {
      icon: <Battery className="w-7 h-7" />,
      title: "Energy Storage",
      description: "Advanced battery solutions to store excess solar energy and ensure reliable power supply.",
    },
    {
      icon: <Sun className="w-7 h-7" />,
      title: "Solar Consulting",
      description: "Expert guidance on feasibility studies, ROI analysis, and optimal system design.",
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      title: "Maintenance & Support",
      description: "Comprehensive maintenance programs to maximize system performance and longevity.",
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal font-inter text-sm font-medium rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-navy mb-4">
            Complete Solar Solutions
          </h2>
          <p className="font-inter text-navy/70 max-w-2xl mx-auto">
            From initial consultation to ongoing maintenance, we provide end-to-end renewable energy services tailored to your needs.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
