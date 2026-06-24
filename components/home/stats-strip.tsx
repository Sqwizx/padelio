'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { stats } from '../../lib/data';

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      stats.forEach((stat, i) => {
        const el = ref.current!.querySelectorAll('.stat-value')[i] as HTMLElement;
        if (!el) return;
        const obj = { val: 0 };
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: stat.numericValue,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: function () {
              el.textContent = Math.round(obj.val) + stat.suffix;
            },
          }
        );
      });

      gsap.fromTo(
        ref.current!.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        }
      );
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="py-10 border-y"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item flex flex-col gap-1">
            <span
              className="stat-value text-3xl font-black"
              style={{ fontFamily: 'var(--font-display)', color: '#166534' }}
            >
              {stat.value}
            </span>
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
