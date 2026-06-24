import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Plan } from '../../lib/types';

export function PricingCard({ plan }: { plan: Plan }) {
  const bg = plan.dark ? '#166534' : plan.accent ? 'white' : 'var(--color-surface)';
  const textColor = plan.dark ? '#F5F0E8' : 'var(--color-text)';
  const mutedColor = plan.dark ? 'rgba(245,240,232,0.6)' : 'var(--color-muted)';

  return (
    <div
      className="relative rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: bg,
        boxShadow: plan.accent ? '0 8px 40px rgba(61,214,140,0.25)' : 'var(--shadow-soft)',
        border: plan.accent ? '2px solid #3DD68C' : '1px solid transparent',
        color: textColor,
      }}
    >
      {plan.accent && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full"
          style={{ background: '#3DD68C', color: '#1C1C1A' }}
        >
          Most Popular
        </span>
      )}

      <div>
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-1"
          style={{ color: '#3DD68C' }}
        >
          {plan.name}
        </p>
        <div className="flex items-end gap-1">
          <span
            className="text-5xl font-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {plan.price}
          </span>
          <span className="text-sm mb-2" style={{ color: mutedColor }}>
            {plan.period}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check
              size={14}
              className="mt-0.5 flex-shrink-0"
              style={{ color: '#3DD68C' }}
            />
            <span style={{ color: mutedColor }}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/contact?plan=${plan.name.toLowerCase()}`}
        className="mt-2 w-full py-3.5 rounded-full font-semibold text-sm text-center transition-all hover:scale-105 inline-block"
        style={{
          background: plan.dark || plan.accent ? '#3DD68C' : '#166534',
          color: '#1C1C1A',
        }}
      >
        {plan.cta}
      </Link>
    </div>
  );
}
