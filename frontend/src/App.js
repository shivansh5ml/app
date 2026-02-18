import React from "react";
import {
  Globe,
  Megaphone,
  PenTool,
  Music2,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description:
      "Mobile-first websites for artists, labels, events, and music brands with fast performance and modern UI.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Result-driven ad campaigns, SEO, and social media strategy to grow audience reach and engagement.",
  },
  {
    icon: PenTool,
    title: "Brand Identity",
    description:
      "Logo, color systems, and visual direction crafted to make your music brand look premium and memorable.",
  },
  {
    icon: Music2,
    title: "Music Promotion",
    description:
      "Targeted release promotion to help tracks and albums reach listeners across digital platforms.",
  },
];

const highlights = [
  "Creative design inspired by leading studio websites",
  "Optimized for mobile, speed, and search visibility",
  "Built for artists, studios, and entertainment brands",
  "Simple maintenance and scalable content structure",
];

const stats = [
  { label: "Projects Delivered", value: "120+" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Marketing Campaigns", value: "300+" },
  { label: "Avg. Growth in Reach", value: "2.8x" },
];

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-primary/70 hover:bg-white/[0.06] transition-all duration-300">
    <div className="mb-4 inline-flex rounded-xl bg-primary/20 p-3">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="mb-2 text-xl font-bold text-white normal-case tracking-normal">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed normal-case tracking-normal">{description}</p>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen text-white selection:bg-primary selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/85 backdrop-blur-lg">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/20 p-2">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight normal-case">Studio Music World</p>
              <p className="text-xs text-muted-foreground normal-case tracking-normal">Digital Creative Agency</p>
            </div>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Contact Now
          </a>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Welcome to Studio Music World</p>
              <h1 className="text-4xl font-black leading-tight text-white md:text-6xl normal-case tracking-tight">
                Build a Powerful Digital Presence for Your Music Brand
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg normal-case tracking-normal leading-relaxed">
                We create modern websites and performance marketing systems inspired by top industry standards,
                helping artists, studios, and music businesses grow faster online.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
                >
                  Explore Services <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:border-white/50 transition-colors"
                >
                  Get a Quote
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-black to-black p-8 shadow-2xl">
              <h2 className="text-2xl font-bold normal-case tracking-normal">Why brands choose us</h2>
              <ul className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <span className="text-muted-foreground normal-case tracking-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="services" className="border-y border-white/10 bg-white/[0.02] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our Services</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl normal-case tracking-tight">Everything your music business needs</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                <p className="text-4xl font-black text-primary normal-case tracking-tight">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground normal-case tracking-normal">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="rounded-3xl border border-primary/40 bg-primary/10 p-8 md:p-12">
              <h2 className="text-3xl font-black md:text-5xl normal-case tracking-tight">Let’s create your next music website</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground normal-case tracking-normal">
                Share your goals and our team will help you plan a complete website and digital growth strategy.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="normal-case tracking-normal">hello@studiomusicworld.com</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="normal-case tracking-normal">+91 90000 00000</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="normal-case tracking-normal">India</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
