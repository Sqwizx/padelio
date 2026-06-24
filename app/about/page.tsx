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
  { name: 'Marco Alves', role: 'Head Coach', img: '/coach-1.jpg' },
  { name: 'Sofia Ribeiro', role: 'Junior Program Lead', img: '/coach-2.jpg' },
  { name: 'Luca Ferretti', role: 'Performance Coach', img: '/coach-3.jpg' },
  { name: 'Ana Costa', role: 'Fitness & Conditioning', img: '/coach-4.jpg' },
];

export default function AboutPage() {
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
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Mission */}
        <div id="mission" className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Our Story
          </span>
          <h1 className="text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Built for the love of padel
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Founded in 2018 by a group of padel enthusiasts who believed the sport deserved a home worthy of its potential. Padelio started with 4 courts and 30 members. Today we have 18 courts, 300+ members, and a coaching team that has trained players from beginner to national level.
          </p>
        </div>

        {/* Values */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-24">
          {values.map(({ Icon, title, desc }) => (
            <div key={title} className="reveal p-8 rounded-2xl flex flex-col gap-4"
              style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(61,214,140,0.15)' }}>
                <Icon size={22} style={{ color: '#3DD68C' }} />
              </div>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Coaches */}
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
      </div>
    </div>
  );
}
