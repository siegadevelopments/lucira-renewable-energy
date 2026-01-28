import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Instant reveal for reduced motion
      gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8 }
        );
      }

      // Animate subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );

      // Animate CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        "-=0.4"
      );

      // Parallax effect on scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineText = "Powering Tomorrow with Clean Energy Today";
  const words = headlineText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy"
      >
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(47,164,169,0.2)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(244,184,96,0.15)_0%,_transparent_40%)]" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
        
        {/* Abstract energy lines */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-teal/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-amber/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
          <Zap className="w-4 h-4 text-amber" />
          <span className="text-white/90 text-sm font-inter">Leading the Renewable Revolution</span>
        </div>

        <h1
          ref={headlineRef}
          className="font-poppins font-light text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
        >
          {words.map((word, index) => (
            <span key={index} className="word inline-block mr-3 md:mr-4">
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subheadlineRef}
          className="font-inter text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
        >
          Lucira Renewable Venture Corporation delivers innovative solar solutions 
          for residential, commercial, and institutional clients committed to a sustainable future.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate("contact")}
            className="group px-8 py-4 bg-amber hover:bg-amber-light text-navy font-inter font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-[0.98] flex items-center gap-2"
          >
            Start Your Solar Journey
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onNavigate("projects")}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-inter font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            View Our Projects
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs font-inter uppercase tracking-widest">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
