'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { Zap, Users, Star } from 'lucide-react';

const values = [
  { Icon: Zap, title: 'Performance First', desc: 'Every decision we make is driven by helping you play better padel. World-class equipment, expert coaching, optimal court conditions.' },
  { Icon: Users, title: 'Community at Heart', desc: 'Padel is a social sport. We build a culture where every member is welcomed, supported, and celebrated — regardless of level.' },
  { Icon: Star, title: 'Excellence Always', desc: 'We hold ourselves to the highest standards — in our facilities, our coaching, and our service. Good enough is never enough.' },
];

const coaches = [
  { name: 'Marco Alves', role: 'Head Coach', img: '/images/coach-1.jpg' },
  { name: 'Sofia Ribeiro', role: 'Junior Program Lead', img: '/images/coach-2.jpg' },
  { name: 'Luca Ferretti', role: 'Performance Coach', img: '/images/coach-3.jpg' },
  { name: 'Ana Costa', role: 'Fitness & Conditioning', img: '/images/coach-4.jpg' },
];

export function AboutContent() {
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
    <>
      <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-24">
        {values.map(({ Icon, title, desc }) => (
          <div key={title} className="reveal p-8 rounded-2xl flex flex-col gap-4"
            style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(61,214,140,0.15)' }}>
              <Icon size={22} style={{ color: '#3DD68C' }} />
            </div>
            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{desc}</p>
          </div>
        ))}
      </div>
      <div id="coaches">
        <h2 className="text-3xl font-black mb-10 text-center" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
          Meet the coaches
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {coaches.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-3 text-center">
              <img src={c.img} alt={c.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div>
                <p className="font-bold text-sm">{c.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
