import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Users, Globe, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function ValueItem({ icon, title, description, index }: ValueProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={itemRef} className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-poppins font-semibold text-lg text-navy mb-1">{title}</h4>
        <p className="font-inter text-sm text-navy/70">{description}</p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: <Target className="w-6 h-6 text-amber" />,
      title: "Mission-Driven",
      description: "Committed to accelerating the global transition to sustainable energy.",
    },
    {
      icon: <Users className="w-6 h-6 text-amber" />,
      title: "Client-Focused",
      description: "Tailored solutions that align with your specific energy goals and budget.",
    },
    {
      icon: <Globe className="w-6 h-6 text-amber" />,
      title: "Environmental Impact",
      description: "Every project contributes to a cleaner, more sustainable planet.",
    },
    {
      icon: <Award className="w-6 h-6 text-amber" />,
      title: "Excellence",
      description: "Industry-leading technology and certified installation professionals.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={leftRef}>
            <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal font-inter text-sm font-medium rounded-full mb-4">
              About Lucira
            </span>
            <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-navy mb-6">
              Pioneering Renewable Energy Since 2010
            </h2>
            <p className="font-inter text-navy/70 text-lg leading-relaxed mb-8">
              Lucira Renewable Venture Corporation was founded with a simple yet ambitious vision: 
              to make clean, renewable energy accessible to everyone. Over the past decade, we've 
              grown from a small team of passionate engineers to a leading force in the solar 
              energy industry.
            </p>
            <p className="font-inter text-navy/70 leading-relaxed mb-10">
              Today, we serve residential homeowners, commercial enterprises, and institutional 
              clients across the nation, delivering innovative solar solutions that reduce costs, 
              increase energy independence, and contribute to a sustainable future.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <ValueItem key={index} {...value} index={index} />
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                alt="Solar installation team at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 max-w-[200px]">
              <div className="font-poppins font-semibold text-3xl text-navy mb-1">
                14<span className="text-teal">+</span>
              </div>
              <div className="font-inter text-sm text-navy/70">
                Years of industry experience
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber/20 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 -right-8 w-32 h-32 bg-teal/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
