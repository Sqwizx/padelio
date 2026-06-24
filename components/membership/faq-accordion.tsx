'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Can I cancel my membership anytime?',
    a: 'Yes. You can cancel with 30 days notice. No lock-in contracts.',
  },
  {
    q: 'Are court bookings transferable?',
    a: 'Unused bookings roll over for up to 2 months on Pro and Elite plans.',
  },
  {
    q: 'Do you offer family memberships?',
    a: 'Yes — contact us for custom family bundles with significant discounts.',
  },
  {
    q: 'Can I bring guests without being a member?',
    a: 'Non-members can book courts at a day rate of €25/hour. Members get guest passes included.',
  },
  {
    q: 'What happens if I want to upgrade my plan?',
    a: 'Upgrades are prorated and take effect immediately. Downgrades take effect on the next billing cycle.',
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      className="flex flex-col divide-y"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {faqs.map((faq, i) => (
        <div key={i} className="py-5">
          <button
            className="w-full flex items-center justify-between text-left gap-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-sm md:text-base">{faq.q}</span>
            <ChevronDown
              size={18}
              className="flex-shrink-0 transition-transform duration-300"
              style={{
                transform: open === i ? 'rotate(180deg)' : 'none',
                color: '#3DD68C',
              }}
            />
          </button>
          {open === i && (
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
