import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        [formRef.current, infoRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (name: string, value: string) => {
    const newErrors: FormErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(value)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;
      case "message":
        if (!value.trim()) {
          newErrors.message = "Message is required";
        } else if (value.length < 10) {
          newErrors.message = "Message must be at least 10 characters";
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("message", formData.message);

    if (Object.keys(errors).length === 0 && formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const inputClasses = (field: string, hasError: boolean) => `
    w-full px-4 py-3 bg-white border-2 rounded-xl font-inter text-navy
    transition-all duration-300 outline-none
    ${hasError 
      ? "border-red-400 focus:border-red-500" 
      : focused === field 
        ? "border-teal" 
        : "border-navy/10 hover:border-navy/20"
    }
  `;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-cool-gray relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber/5 rounded-full blur-3xl" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal font-inter text-sm font-medium rounded-full mb-4">
            Get in Touch
          </span>
          <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-navy mb-4">
            Start Your Solar Journey
          </h2>
          <p className="font-inter text-navy/70 max-w-2xl mx-auto">
            Ready to harness the power of the sun? Contact us for a free consultation and discover 
            how Lucira can transform your energy future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-teal" />
                </div>
                <h3 className="font-poppins font-semibold text-2xl text-navy mb-3">
                  Message Sent!
                </h3>
                <p className="font-inter text-navy/70">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label className="block font-inter text-sm font-medium text-navy mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputClasses("name", !!errors.name)}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-inter">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-inter text-sm font-medium text-navy mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={inputClasses("email", !!errors.email)}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-inter">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-inter text-sm font-medium text-navy mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      className={inputClasses("phone", false)}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block font-inter text-sm font-medium text-navy mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      onFocus={() => setFocused("projectType")}
                      onBlur={() => setFocused(null)}
                      className={inputClasses("projectType", false)}
                    >
                      <option value="">Select a type</option>
                      <option value="residential">Residential Solar</option>
                      <option value="commercial">Commercial Solar</option>
                      <option value="industrial">Industrial Solar</option>
                      <option value="consulting">Consulting Services</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block font-inter text-sm font-medium text-navy mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    className={inputClasses("message", !!errors.message)}
                    placeholder="Tell us about your project and energy goals..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-inter">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-amber hover:bg-amber-light text-navy font-inter font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2">
            <div className="bg-navy rounded-2xl p-8 text-white h-full">
              <h3 className="font-poppins font-semibold text-xl mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-white/60 mb-1">Email Us</p>
                    <a
                      href="mailto:contact@lucira-energy.com"
                      className="font-inter text-white hover:text-amber transition-colors"
                    >
                      contact@lucira-energy.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-white/60 mb-1">Call Us</p>
                    <a
                      href="tel:+18001234567"
                      className="font-inter text-white hover:text-amber transition-colors"
                    >
                      1-800-LUCIRA-7
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-white/60 mb-1">Visit Us</p>
                    <p className="font-inter text-white">
                      1234 Solar Drive, Suite 500<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-poppins font-semibold text-lg mb-4">Office Hours</h4>
                <div className="space-y-2 font-inter text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Monday - Friday</span>
                    <span className="text-white">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Saturday</span>
                    <span className="text-white">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
