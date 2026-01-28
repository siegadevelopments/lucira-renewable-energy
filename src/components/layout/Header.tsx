import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, Sun } from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

const navLinks = [
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Header({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled ? "bg-white/95 shadow-md" : "bg-white/10"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo (uses /logo.png from the public folder) */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Lucira logo"
                className="h-16 object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`font-inter text-sm font-medium transition-colors hover:text-teal ${
                    scrolled ? "text-navy/80" : "text-white/90"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("contact")}
                className="px-5 py-2.5 bg-amber hover:bg-amber-light text-navy font-inter font-medium text-sm rounded-full transition-all hover:scale-105 active:scale-[0.98]"
              >
                Get a Quote
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-navy/90 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            className="absolute top-20 left-0 right-0 bg-white rounded-b-2xl shadow-xl p-6"
          >
            <div ref={linksRef} className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="py-3 text-left font-inter text-lg font-medium text-navy hover:text-teal transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("contact")}
                className="mt-4 w-full py-3 bg-amber hover:bg-amber-light text-navy font-inter font-semibold rounded-full transition-all"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
