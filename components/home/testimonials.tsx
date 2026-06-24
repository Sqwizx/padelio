'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials, floatingTags } from '../../lib/data';

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.testimonial-card'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      );

      // Marquee: duplicate tags and animate
      const el = marqueeRef.current;
      if (!el) return;
      const totalWidth = el.scrollWidth / 2;
      gsap.to(el, {
        x: -totalWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    });
  }, { scope: ref });

  return (
    <section className="py-24 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            What members say
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-white transition-colors"
              style={{ borderColor: 'var(--color-border)' }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-white transition-colors"
              style={{ borderColor: 'var(--color-border)' }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card p-7 rounded-2xl flex flex-col gap-4 transition-all duration-300"
              style={{
                background: i === active ? '#166534' : 'white',
                color: i === active ? '#F5F0E8' : 'var(--color-text)',
                boxShadow: i === active ? '0 8px 32px rgba(22,101,52,0.2)' : 'var(--shadow-soft)',
                transform: i === active ? 'translateY(-4px)' : 'none',
              }}
            >
              <p className="text-sm leading-relaxed italic opacity-90">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs opacity-60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="overflow-hidden">
          <div ref={marqueeRef} className="flex gap-3 whitespace-nowrap">
            {[...floatingTags, ...floatingTags].map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium flex-shrink-0"
                style={{ background: 'rgba(61,214,140,0.12)', color: '#166534' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
