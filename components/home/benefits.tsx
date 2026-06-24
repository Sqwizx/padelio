'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { Zap, Users, Star } from 'lucide-react';
import { benefits } from '../../lib/data';

const iconMap = { Zap, Users, Star };

export function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.benefit-card'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Why Padel
          </span>
          <h2 className="text-4xl font-black" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Good for body. Good for soul.
          </h2>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = iconMap[b.iconName as keyof typeof iconMap];
            return (
              <div
                key={b.title}
                className="benefit-card p-8 rounded-2xl flex flex-col gap-4"
                style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(61,214,140,0.15)' }}>
                  <Icon size={22} style={{ color: '#3DD68C' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
