import { useState } from "react";
import { ArrowRight, Menu, X, ChevronDown, Star, Zap, Users, Clock, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────

const GreenHighlight = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#3DD68C" }}>{children}</span>
);

const PillLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase"
    style={{ borderColor: "rgba(28,28,26,0.2)", color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
    {children}
  </span>
);

// ── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Courts", "Programs", "About", "Contact"];
  return (
    <nav className="sticky top-0 z-50 border-b border-border"
      style={{ background: "#F5F0E8", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="text-2xl font-black tracking-tight"
          style={{ fontFamily: "'Urbanist', sans-serif", color: "#166534", letterSpacing: "-0.04em" }}>
          PADELIO
        </a>
        {/* desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
              style={{ color: "#1C1C1A" }}>
              {l}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:opacity-80 text-white"
            style={{ background: "#3DD68C", boxShadow: "0 4px 24px rgba(61,214,140,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
            Book a Court
          </a>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4"
          style={{ background: "#F5F0E8" }}>
          {links.map(l => (
            <a key={l} href="#" className="text-base font-medium" style={{ color: "#1C1C1A" }}>{l}</a>
          ))}
          <a href="#" className="w-full text-center py-3 rounded-full font-semibold text-white"
            style={{ background: "#3DD68C" }}>
            Book a Court
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [date, setDate] = useState("2026-06-28");
  const [time, setTime] = useState("10:00");
  const [players, setPlayers] = useState("2");

  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid lg:grid-cols-2 gap-12 items-center">
      {/* left */}
      <div>
        <PillLabel>Premium Padel Academy</PillLabel>
        <h1 className="mt-6 font-black leading-none tracking-tight"
          style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.05, color: "#1C1C1A" }}>
          Play <GreenHighlight>Padel</GreenHighlight>
          <br />Your Way.
        </h1>
        <p className="mt-6 text-lg leading-relaxed max-w-md"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6B5E" }}>
          World-class courts, certified coaches, and a community that plays as hard as it celebrates. Book your session today.
        </p>

        {/* quick-book widget */}
        <div className="mt-10 p-5 rounded-2xl border border-border inline-block w-full max-w-md"
          style={{ background: "#EDE8DF" }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B6B5E" }}>Quick Booking</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="w-full rounded-xl px-3 py-2 text-sm border border-border outline-none focus:ring-2 focus:ring-primary"
                style={{ background: "#F5F0E8", color: "#1C1C1A", fontFamily: "'DM Sans', sans-serif" }} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)}
                className="w-full rounded-xl px-3 py-2 text-sm border border-border outline-none focus:ring-2 focus:ring-primary"
                style={{ background: "#F5F0E8", color: "#1C1C1A", fontFamily: "'DM Sans', sans-serif" }} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>Players</label>
              <select value={players} onChange={e => setPlayers(e.target.value)}
                className="w-full rounded-xl px-3 py-2 text-sm border border-border outline-none focus:ring-2 focus:ring-primary"
                style={{ background: "#F5F0E8", color: "#1C1C1A", fontFamily: "'DM Sans', sans-serif" }}>
                <option>2</option><option>4</option>
              </select>
            </div>
          </div>
          <button className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2 text-white"
            style={{ background: "#3DD68C", boxShadow: "0 4px 24px rgba(61,214,140,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
            Check Availability <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* right: hero image */}
      <div className="relative hidden lg:block">
        <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-card"
          style={{ boxShadow: "0 8px 48px rgba(28,28,26,0.14)" }}>
          <img
            src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=1000&fit=crop&auto=format"
            alt="Padel players on a premium glass court"
            className="w-full h-full object-cover"
          />
          {/* floating stat card */}
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl px-5 py-4 flex items-center justify-between"
            style={{ background: "rgba(245,240,232,0.92)", backdropFilter: "blur(12px)" }}>
            <div className="text-center">
              <p className="font-black text-2xl leading-none" style={{ fontFamily: "'Urbanist', sans-serif", color: "#3DD68C" }}>300+</p>
              <p className="text-xs mt-1" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>Active Members</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="font-black text-2xl leading-none" style={{ fontFamily: "'Urbanist', sans-serif", color: "#1C1C1A" }}>18</p>
              <p className="text-xs mt-1" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>Premium Courts</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="font-black text-2xl leading-none" style={{ fontFamily: "'Urbanist', sans-serif", color: "#1C1C1A" }}>5★</p>
              <p className="text-xs mt-1" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>Google Rating</p>
            </div>
          </div>
        </div>
        {/* decorative dot grid */}
        <div className="absolute -top-6 -right-6 w-32 h-32 opacity-20"
          style={{ backgroundImage: "radial-gradient(#3DD68C 1.5px, transparent 1.5px)", backgroundSize: "12px 12px" }} />
      </div>
    </section>
  );
}

// ── Stats Strip ───────────────────────────────────────────────────────────────

function StatsStrip() {
  const stats = [
    { value: "2018", label: "Est. Year" },
    { value: "300+", label: "Active Members" },
    { value: "18", label: "Padel Courts" },
    { value: "5★", label: "Google Rating" },
    { value: "40+", label: "Weekly Sessions" },
    { value: "12", label: "Pro Coaches" },
  ];
  return (
    <section className="border-y border-border overflow-x-auto"
      style={{ background: "#EDE8DF" }}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-8 min-w-max lg:justify-between">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-4">
            <div>
              <p className="font-black text-xl leading-none"
                style={{ fontFamily: "'Urbanist', sans-serif", color: "#3DD68C" }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
            </div>
            {i < stats.length - 1 && <div className="w-px h-8 bg-border" />}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Mission ───────────────────────────────────────────────────────────────────

function Mission() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-28 text-center">
      <PillLabel>Who We Are</PillLabel>
      <h2 className="mt-8 font-black italic leading-tight"
        style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#1C1C1A", lineHeight: 1.15 }}>
        We believe in sportsmanship,
        <br />inclusivity, and the pure joy of{" "}
        <GreenHighlight>real padel</GreenHighlight> —
        <br />values that define every court we build.
      </h2>
      <div className="mt-12 flex items-center justify-center gap-10 flex-wrap">
        {["Certified Coaching", "Community First", "All Skill Levels", "Year-Round Play"].map(t => (
          <span key={t} className="flex items-center gap-2 text-sm font-medium"
            style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#3DD68C" }} />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

// ── Stories Gallery ───────────────────────────────────────────────────────────

const stories = [
  { cat: "Coaching", title: "From Zero to Tournament Ready", img: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?w=600&h=700&fit=crop&auto=format", alt: "Padel coach instructing player" },
  { cat: "Community", title: "The Weekend Warriors Who Never Stop", img: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=700&fit=crop&auto=format", alt: "Group of padel players celebrating" },
  { cat: "Training", title: "Practice, Precision & Victory", img: "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=600&h=700&fit=crop&auto=format", alt: "Player hitting a padel ball mid-air" },
  { cat: "Courts", title: "Excellence On Every Surface", img: "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?w=600&h=700&fit=crop&auto=format", alt: "Premium padel court top view" },
];

function Stories() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <PillLabel>Impact In Action</PillLabel>
            <h2 className="mt-4 font-black leading-tight"
              style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1A", lineHeight: 1.1 }}>
              Stories of Innovation,
              <br />Quality & Impact
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:opacity-80 text-white"
            style={{ background: "#3DD68C", fontFamily: "'DM Sans', sans-serif" }}>
            View All Cases <ArrowRight size={15} />
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stories.map((s, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-card cursor-pointer"
              style={{ aspectRatio: "3/4" }}>
              <img src={s.img} alt={s.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{ background: "#3DD68C", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
                  {s.cat}
                </span>
                <p className="font-bold text-white text-sm leading-tight"
                  style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  {s.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Programs Accordion ────────────────────────────────────────────────────────

const programs = [
  {
    title: "For Beginners",
    subtitle: "Start Your Padel Journey",
    tags: ["Confidence Building", "Fundamentals", "Grip & Stance"],
    desc: "A welcoming introduction focused on technique, footwork, and confidence-building. Learn the rules, rallies, and rhythm of padel in a supportive group setting.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&auto=format",
    imgAlt: "Beginner padel lesson",
  },
  {
    title: "For Junior & Kids",
    subtitle: "Age-Specific Development",
    tags: ["Ages 6–16", "Game-Based Learning", "Coordination"],
    desc: "Progressive programs that nurture young talent from foundational skills to pre-tournament preparation. Dynamic groups focused on coordination, values, and early tactical awareness.",
    img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500&h=400&fit=crop&auto=format",
    imgAlt: "Junior padel training",
  },
  {
    title: "For Adults",
    subtitle: "Compete & Connect",
    tags: ["Social Leagues", "Fitness", "Weekend Tournaments"],
    desc: "Mix fitness, fun, and fierce competition. Adult programs cater to all skill levels with social ladders, weekend tournaments, and structured fitness training on court.",
    img: "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=500&h=400&fit=crop&auto=format",
    imgAlt: "Adult padel players competing",
  },
  {
    title: "For Professionals",
    subtitle: "Elite Performance Training",
    tags: ["High Intensity", "Match Analytics", "Tournament Prep"],
    desc: "Designed for competitive players who demand more. Video analysis, physical conditioning, match strategy sessions, and access to elite drilling partners and coaches.",
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500&h=400&fit=crop&auto=format",
    imgAlt: "Professional padel training session",
  },
  {
    title: "Elite Coaching 1-on-1",
    subtitle: "Personalized Mastery",
    tags: ["Private Sessions", "Custom Plan", "Accelerated Progress"],
    desc: "One-on-one sessions with our most senior certified coaches. Build a bespoke development roadmap with individualized video feedback and monthly performance reviews.",
    img: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?w=500&h=400&fit=crop&auto=format",
    imgAlt: "One on one padel coaching",
  },
];

function Programs() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20" style={{ background: "#EDE8DF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <PillLabel>Your Club Spaces</PillLabel>
            <h2 className="mt-4 font-black leading-tight"
              style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1A" }}>
              Programs For <GreenHighlight>Every Level</GreenHighlight>
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-0 divide-y divide-border rounded-2xl overflow-hidden border border-border"
          style={{ background: "#F5F0E8" }}>
          {programs.map((p, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between px-8 py-6 text-left transition-colors hover:bg-card"
                  onClick={() => setOpenIdx(isOpen ? null : i)}>
                  <div>
                    <p className="font-black text-xl leading-tight"
                      style={{ fontFamily: "'Urbanist', sans-serif", color: isOpen ? "#3DD68C" : "#1C1C1A" }}>
                      {p.title}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
                      {p.subtitle}
                    </p>
                  </div>
                  <ChevronDown size={20} className="transition-transform duration-300 flex-shrink-0"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: isOpen ? "#3DD68C" : "#6B6B5E" }} />
                </button>

                <div className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: isOpen ? "500px" : "0px" }}>
                  <div className="px-8 pb-8 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-base leading-relaxed mb-5"
                        style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.tags.map(t => (
                          <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold border border-border"
                            style={{ color: "#166534", background: "rgba(61,214,140,0.12)", fontFamily: "'DM Sans', sans-serif" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-85"
                        style={{ background: "#3DD68C", fontFamily: "'DM Sans', sans-serif" }}>
                        Explore Program <ArrowRight size={14} />
                      </a>
                    </div>
                    <div className="rounded-xl overflow-hidden bg-card" style={{ aspectRatio: "4/3" }}>
                      <img src={p.img} alt={p.imgAlt} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Courts Showcase ───────────────────────────────────────────────────────────

function CourtsShowcase() {
  const courtTypes = [
    { name: "Glass-Back Courts", note: "Indoor climate-controlled" },
    { name: "Panoramic Outdoor", note: "Natural turf surface" },
    { name: "Hard Acrylic Courts", note: "Professional grade" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-card" style={{ minHeight: 480 }}>
          <img
            src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1400&h=600&fit=crop&auto=format"
            alt="Aerial view of Padelio premium padel courts"
            className="w-full h-full object-cover absolute inset-0"
            style={{ minHeight: 480 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          <div className="relative z-10 flex items-end h-full p-10 md:p-16" style={{ minHeight: 480 }}>
            <div className="grid md:grid-cols-2 gap-10 items-end w-full">
              <div>
                <PillLabel>Professional Courts</PillLabel>
                <h2 className="mt-4 font-black italic text-white"
                  style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}>
                  Hard & Glass<br />Courts
                </h2>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "rgba(237,232,223,0.88)", backdropFilter: "blur(12px)" }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>Court Types</p>
                <ul className="flex flex-col gap-3 mb-6">
                  {courtTypes.map(c => (
                    <li key={c.name} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ background: "#3DD68C", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "#1C1C1A", fontFamily: "'DM Sans', sans-serif" }}>{c.name}</p>
                        <p className="text-xs" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>{c.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-85"
                  style={{ background: "#166534", fontFamily: "'DM Sans', sans-serif" }}>
                  View All Courts <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Benefits Grid ─────────────────────────────────────────────────────────────

const benefits = [
  { icon: Zap, title: "Full-Body Workout", desc: "Padel engages every muscle group — agility, explosive power, and endurance combine in every 90-minute session on court." },
  { icon: Users, title: "Builds Real Community", desc: "More than a sport — it's a social experience. Our leagues, events, and open courts foster genuine friendships off the court." },
  { icon: Star, title: "Suitable For All Ages", desc: "From 6 to 60+, padel's compact courts and forgiving glass walls make it one of the most accessible racket sports in the world." },
];

function Benefits() {
  return (
    <section className="py-20" style={{ background: "#EDE8DF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 grid md:grid-cols-2 gap-8 items-end">
          <div>
            <PillLabel>Why Padel</PillLabel>
            <h2 className="mt-4 font-black leading-tight"
              style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1A" }}>
              Where Tennis Transforms<br />Your Life & Skills
            </h2>
          </div>
          <p className="text-base leading-relaxed"
            style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
            Our programs, coaches, and facilities create an environment where every player — regardless of experience — can improve, compete, and enjoy.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="rounded-2xl p-8 border border-border transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ background: "#F5F0E8", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(61,214,140,0.15)" }}>
                <b.icon size={22} style={{ color: "#3DD68C" }} />
              </div>
              <h3 className="font-black text-lg mb-3"
                style={{ fontFamily: "'Urbanist', sans-serif", color: "#1C1C1A" }}>
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed"
                style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "The coaches don't just teach — they explain, correct, and motivate. I've never felt more confident stepping on the court.",
    name: "Paul G.", role: "Member of Club", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "I started with zero experience and felt intimidated at first, but the trainers made everything fun and easy to follow.",
    name: "Marcy R.", role: "Member of Club", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "Best decision I made this year. The courts are immaculate, the vibe is incredible, and my game has improved massively.",
    name: "Tomas P.", role: "Pro Member", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
  },
];

const floatingTags = ["Best Courts", "Amazing Coaches", "Pro Trainers", "Quality Courts", "Best Team", "Amazing Results", "Awesome Vibe", "Perfect Courts"];

function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <PillLabel>Testimonials</PillLabel>

        {/* floating tags marquee */}
        <div className="mt-8 mb-12 flex flex-wrap gap-2 justify-center">
          {floatingTags.map((t, i) => (
            <span key={i} className="px-4 py-2 rounded-full text-xs font-semibold border"
              style={{
                background: i % 3 === 0 ? "#3DD68C" : i % 3 === 1 ? "#166534" : "#F5F0E8",
                color: i % 3 === 2 ? "#1C1C1A" : "#fff",
                borderColor: i % 3 === 2 ? "rgba(28,28,26,0.12)" : "transparent",
                fontFamily: "'DM Sans', sans-serif",
                transform: i % 2 === 0 ? "rotate(-2deg)" : "rotate(1.5deg)",
              }}>
              {t}
            </span>
          ))}
        </div>

        <h2 className="font-black leading-tight mb-10"
          style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1A" }}>
          What Our Members Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl p-8 border border-border cursor-pointer transition-all"
              style={{
                background: active === i ? "#EDE8DF" : "#F5F0E8",
                boxShadow: active === i ? "0 8px 32px rgba(61,214,140,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
                borderColor: active === i ? "#3DD68C" : "rgba(28,28,26,0.12)",
              }}
              onClick={() => setActive(i)}>
              <p className="font-bold text-2xl mb-4" style={{ color: "#3DD68C", fontFamily: "'Urbanist', sans-serif" }}>"</p>
              <p className="text-sm leading-relaxed mb-6"
                style={{ color: "#1C1C1A", fontFamily: "'DM Sans', sans-serif" }}>
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-card" />
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: "'Urbanist', sans-serif", color: "#1C1C1A" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all"
              style={{
                width: active === i ? 24 : 8, height: 8,
                background: active === i ? "#3DD68C" : "rgba(28,28,26,0.2)",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Membership CTA ────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Starter", price: "€29", period: "/mo",
    features: ["2 court bookings/month", "Access to open sessions", "Member app access"],
    cta: "Get Started", accent: false,
  },
  {
    name: "Pro", price: "€79", period: "/mo",
    features: ["Unlimited court bookings", "Group coaching sessions", "Priority booking window", "Member events & tournaments"],
    cta: "Join Pro", accent: true,
  },
  {
    name: "Elite", price: "€149", period: "/mo",
    features: ["Everything in Pro", "2× private coaching sessions", "Personalized training plan", "Locker room & equipment"],
    cta: "Go Elite", accent: false, dark: true,
  },
];

function Membership() {
  return (
    <section className="py-20" style={{ background: "#EDE8DF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <PillLabel>Membership</PillLabel>
          <h2 className="mt-4 font-black"
            style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1A" }}>
            Choose Your <GreenHighlight>Game Plan</GreenHighlight>
          </h2>
          <p className="mt-4 text-base max-w-lg mx-auto"
            style={{ color: "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
            Flexible memberships designed for every lifestyle. Cancel anytime.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i} className="rounded-2xl p-8 border flex flex-col"
              style={{
                background: p.dark ? "#166534" : p.accent ? "#3DD68C" : "#F5F0E8",
                borderColor: p.accent ? "#3DD68C" : p.dark ? "#166534" : "rgba(28,28,26,0.12)",
                boxShadow: p.accent ? "0 8px 32px rgba(61,214,140,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
              }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: (p.accent || p.dark) ? "rgba(255,255,255,0.7)" : "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
                {p.name}
              </p>
              <div className="flex items-end gap-1 mb-6">
                <span className="font-black text-4xl"
                  style={{ fontFamily: "'Urbanist', sans-serif", color: (p.accent || p.dark) ? "#fff" : "#1C1C1A" }}>
                  {p.price}
                </span>
                <span className="text-sm mb-1" style={{ color: (p.accent || p.dark) ? "rgba(255,255,255,0.7)" : "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>{p.period}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-grow">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm"
                    style={{ color: (p.accent || p.dark) ? "rgba(255,255,255,0.85)" : "#6B6B5E", fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="mt-0.5 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill={p.accent ? "rgba(255,255,255,0.3)" : p.dark ? "rgba(255,255,255,0.2)" : "rgba(61,214,140,0.2)"} />
                        <path d="M4 7l2 2 4-4" stroke={p.accent || p.dark ? "#fff" : "#3DD68C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-85"
                style={{
                  background: p.accent ? "#fff" : p.dark ? "#3DD68C" : "#1C1C1A",
                  color: p.accent ? "#166534" : "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    { heading: "Academy", links: ["About Us", "Our Coaches", "Courts", "Press"] },
    { heading: "Programs", links: ["Beginners", "Junior & Kids", "Adults", "Elite Coaching"] },
    { heading: "Booking", links: ["Book a Court", "Membership", "Gift Cards", "Contact"] },
  ];
  const socials = [
    { Icon: Instagram, label: "Instagram" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Facebook, label: "Facebook" },
    { Icon: Youtube, label: "YouTube" },
  ];
  return (
    <footer style={{ background: "#166534" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        {/* brand */}
        <div>
          <p className="font-black text-2xl tracking-tight mb-3"
            style={{ fontFamily: "'Urbanist', sans-serif", color: "#fff", letterSpacing: "-0.04em" }}>
            PADELIO
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}>
            Fresh Courts. Real Game.
            <br />Where the green meets the game.
          </p>
          <div className="flex gap-3">
            {socials.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "#3DD68C" }}>
                <Icon size={15} color="#fff" />
              </a>
            ))}
          </div>
        </div>

        {cols.map(col => (
          <div key={col.heading}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
              {col.heading}
            </p>
            <ul className="flex flex-col gap-3">
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t max-w-7xl mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
          © 2026 Padelio Academy. All rights reserved.
        </p>
        <p className="text-xs font-semibold" style={{ color: "#3DD68C", fontFamily: "'DM Sans', sans-serif" }}>
          Fresh Courts. Real Game.
        </p>
      </div>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F5F0E8" }}>
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <Mission />
        <Stories />
        <Programs />
        <CourtsShowcase />
        <Benefits />
        <Testimonials />
        <Membership />
      </main>
      <Footer />
    </div>
  );
}
