'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { stories } from '../../lib/data';

export function Stories() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.story-card'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <section className="py-20" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-10" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
          Our Stories
        </h2>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stories.map((s) => (
            <div
              key={s.cat}
              className="story-card group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded-full mb-2 inline-block"
                  style={{ background: '#3DD68C', color: '#1C1C1A' }}>
                  {s.cat}
                </span>
                <p className="text-white text-sm font-semibold leading-tight">{s.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
