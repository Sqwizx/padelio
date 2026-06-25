'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { Check } from 'lucide-react';
import type { CourtType } from '../../lib/types';
import { BookingWidget } from './booking-widget';

export function CourtsContent({ courtTypes }: { courtTypes: CourtType[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      );
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-start">
      <div>
        <span className="reveal text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block"
          style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>Court Types</span>
        <h2 className="reveal text-3xl font-black mb-8" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
          A court for every game
        </h2>
        <div className="reveal flex flex-col gap-4">
          {courtTypes.map((ct) => (
            <div key={ct.name} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--color-surface)' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#3DD68C' }}>
                <Check size={12} style={{ color: '#1C1C1A' }} />
              </div>
              <div>
                <p className="font-semibold text-sm">{ct.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{ct.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="reveal" id="book">
        <BookingWidget />
      </div>
    </div>
  );
}
