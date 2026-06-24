'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 max-w-4xl mx-auto px-6 text-center">
      <span className="reveal inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
        style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
        Who We Are
      </span>
      <h2 className="reveal text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
        More than a club.<br />A movement.
      </h2>
      <p className="reveal text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        Founded in 2018, Padelio was built on one belief: padel should be for everyone. We created a space where beginners find confidence, competitors find challenge, and everyone finds community. Our 12 professional coaches bring decades of combined experience — and a passion for the sport that&apos;s contagious.
      </p>
    </section>
  );
}
