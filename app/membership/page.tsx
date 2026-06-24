'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { plans } from '../../lib/data';
import { PricingCard } from '../../components/membership/pricing-card';
import { FaqAccordion } from '../../components/membership/faq-accordion';

export default function MembershipPage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          ref.current!.querySelectorAll('.card-reveal'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}
          >
            Membership Plans
          </span>
          <h1
            className="text-5xl font-black mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#166534' }}
          >
            Simple, honest pricing
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--color-muted)' }}
          >
            No hidden fees. Cancel anytime. Choose the plan that fits your game.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-24">
          {plans.map((p) => (
            <div key={p.name} className="card-reveal">
              <PricingCard plan={p} />
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-black mb-8 text-center"
            style={{ fontFamily: 'var(--font-display)', color: '#166534' }}
          >
            Frequently asked questions
          </h2>
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
