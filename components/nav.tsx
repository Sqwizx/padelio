'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Programs', href: '/programs' },
  { label: 'Courts', href: '/courts' },
  { label: 'Membership', href: '/membership' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => {
          gsap.to(navRef.current, {
            borderBottomColor: 'rgba(28,28,26,0.08)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
            paddingTop: '12px',
            paddingBottom: '12px',
            duration: 0.3,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            borderBottomColor: 'transparent',
            boxShadow: 'none',
            paddingTop: '20px',
            paddingBottom: '20px',
            duration: 0.3,
            ease: 'power2.out',
          });
        },
      });
    });
  }, { scope: navRef });

  useEffect(() => {
    if (!mobileLinksRef.current) return;
    const items = mobileLinksRef.current.querySelectorAll('a');
    if (open) {
      gsap.fromTo(items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between"
        style={{ background: 'var(--color-bg)', borderBottom: '1px solid transparent', transition: 'background 0.3s' }}
      >
        <Link href="/" className="text-xl font-black tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-dark)' }}>
          PADELIO
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-[#3DD68C]"
              style={{ color: pathname === l.href ? '#3DD68C' : 'var(--color-text)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/courts"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: '#3DD68C', color: '#1C1C1A' }}
          >
            Book a Court
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-24 px-8 gap-6"
          style={{ background: 'var(--color-bg)' }}
        >
          <div ref={mobileLinksRef} className="flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-3xl font-black"
                style={{ fontFamily: 'var(--font-display)', color: pathname === l.href ? '#3DD68C' : 'var(--color-text)' }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/courts"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-fit items-center px-6 py-3 rounded-full text-base font-semibold"
              style={{ background: '#3DD68C', color: '#1C1C1A' }}
            >
              Book a Court
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
