import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Zap, Building2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface MetricProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

function Metric({ icon, value, suffix, label }: MetricProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const metricRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: metricRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          gsap.to(
            { val: 0 },
            {
              val: value,
              duration: 2,
              ease: "power2.out",
              onUpdate: function () {
                setDisplayValue(Math.round(this.targets()[0].val));
              },
            }
          );
        },
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={metricRef} className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-teal/10 rounded-2xl mb-4">
        {icon}
      </div>
      <div className="font-poppins font-semibold text-4xl md:text-5xl text-navy mb-2">
        {displayValue.toLocaleString()}
        <span className="text-teal">{suffix}</span>
      </div>
      <div className="font-inter text-navy/70 text-sm">{label}</div>
    </div>
  );
}

export default function ValuePropSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
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
    });

    return () => ctx.revert();
  }, []);

  const metrics = [
    {
      icon: <Zap className="w-8 h-8 text-teal" />,
      value: 500,
      suffix: "+ MW",
      label: "Solar Capacity Installed",
    },
    {
      icon: <Leaf className="w-8 h-8 text-teal" />,
      value: 250000,
      suffix: "",
      label: "Tons CO₂ Offset Annually",
    },
    {
      icon: <Building2 className="w-8 h-8 text-teal" />,
      value: 1200,
      suffix: "+",
      label: "Projects Completed",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-cool-gray relative overflow-hidden"
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <div ref={contentRef} className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal font-inter text-sm font-medium rounded-full mb-4">
            Our Impact
          </span>
          <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-navy">
            Driving Sustainable Change
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {metrics.map((metric, index) => (
            <Metric key={index} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
