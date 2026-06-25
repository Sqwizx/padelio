'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import type { Plan } from '../../lib/types';
import { PricingCard } from './pricing-card';
import { FaqAccordion } from './faq-accordion';

export function MembershipContent({ plans }: { plans: Plan[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.card-reveal'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      );
    });
  }, { scope: ref });
  return (
    <>
      <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-20">
        {plans.map((p) => (
          <div key={p.name} className="card-reveal">
            <PricingCard plan={p} />
          </div>
        ))}
      </div>

      {/* Feature comparison table */}
      <div className="mb-20 overflow-x-auto">
        <h2 className="text-2xl font-black text-center mb-8" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>Compare plans</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th className="text-left py-3 pr-4 font-semibold w-1/2">Feature</th>
              {['Starter', 'Pro', 'Elite'].map((p) => (
                <th key={p} className="text-center py-3 px-4 font-semibold" style={{ color: '#166534' }}>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Court bookings/month', '2', '8', 'Unlimited'],
              ['Group sessions', '✓', 'Unlimited', 'Unlimited'],
              ['Priority booking', '—', '✓', '✓'],
              ['1-on-1 coaching', '—', '—', '1/month'],
              ['Coaching discount', '—', '20%', '40%'],
              ['Guest passes', '—', '2/month', 'Unlimited'],
              ['Dedicated locker', '—', '—', '✓'],
            ].map(([feature, ...vals]) => (
              <tr key={feature} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td className="py-3 pr-4 font-medium">{feature}</td>
                {vals.map((v, i) => (
                  <td key={i} className="py-3 px-4 text-center"
                    style={{ color: v === '—' ? 'var(--color-muted)' : v === '✓' ? '#3DD68C' : 'var(--color-text)' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-black mb-8 text-center" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
          Frequently asked questions
        </h2>
        <FaqAccordion />
      </div>
    </>
  );
}
