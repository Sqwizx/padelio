'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        containerRef.current!.querySelectorAll('.hero-animate'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 40%, #3DD68C, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <span
            className="hero-animate inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(61,214,140,0.15)', color: '#3DD68C' }}
          >
            Premium Padel Academy
          </span>

          <h1
            className="hero-animate text-5xl md:text-7xl font-black leading-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Play Padel.<br />
            <span style={{ color: '#3DD68C' }}>Love the Game.</span>
          </h1>

          <p
            className="hero-animate text-lg leading-relaxed max-w-md"
            style={{ color: 'var(--color-muted)' }}
          >
            World-class courts, expert coaching, and a community that celebrates every rally. Join Padelio and transform your game.
          </p>

          <div className="hero-animate flex flex-wrap gap-3">
            <Link
              href="/courts"
              className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-base transition-all hover:scale-105"
              style={{ background: '#3DD68C', color: '#1C1C1A', boxShadow: '0 4px 20px rgba(61,214,140,0.35)' }}
            >
              Book a Court
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-base border transition-all hover:bg-white/50"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              View Programs
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div className="hero-animate relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[540px]">
          <Image src="/hero.jpg" alt="Padel court at Padelio" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
          {/* Floating badge */}
          <div
            className="absolute bottom-6 left-6 px-4 py-3 rounded-xl backdrop-blur-sm"
            style={{ background: 'rgba(245,240,232,0.9)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
          >
            <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>Members worldwide</p>
            <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>300+</p>
          </div>
        </div>
      </div>
    </section>
  );
}
