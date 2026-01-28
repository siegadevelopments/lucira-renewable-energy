import { Sun, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Residential Solar", href: "#services" },
    { label: "Commercial Solar", href: "#services" },
    { label: "Industrial Projects", href: "#services" },
    { label: "Energy Storage", href: "#services" },
    { label: "Consulting", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Projects", href: "#projects" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  resources: [
    { label: "Solar Guide", href: "#" },
    { label: "ROI Calculator", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Support", href: "#" },
  ],
};

const socialLinks = [
  { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
  { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-amber flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-poppins font-semibold text-lg">Lucira</span>
                <span className="font-inter text-sm ml-1 text-white/80">
                  Renewable Venture
                </span>
              </div>
            </div>
            <p className="font-inter text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering communities with clean, sustainable energy solutions. 
              Join us in building a brighter, greener future for generations to come.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 hover:bg-amber rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-poppins font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-white/70 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-poppins font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-white/70 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-poppins font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-white/70 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-sm text-white/50">
            © {new Date().getFullYear()} Lucira Renewable Venture Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-inter text-sm text-white/50 hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-inter text-sm text-white/50 hover:text-white/80 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="font-inter text-sm text-white/50 hover:text-white/80 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
