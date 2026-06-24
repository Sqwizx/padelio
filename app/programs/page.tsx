'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { programs } from '../../lib/data';
import { ProgramCard } from '../../components/programs/program-card';

export default function ProgramsPage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        ref.current!.querySelectorAll('.prog-card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        }
      );
    });
  }, { scope: ref });

  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}
          >
            Training Programs
          </span>
          <h1
            className="text-5xl font-black mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#166534' }}
          >
            Find your program
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Whether you're picking up a racket for the first time or competing at a high level, we have a program built for you.
          </p>
        </div>
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div key={p.slug} className="prog-card">
              <ProgramCard program={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
