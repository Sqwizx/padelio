import { Suspense } from 'react';
import { ContactForm } from '../../components/contact/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}
          >
            Get in Touch
          </span>
          <h1
            className="text-5xl font-black mb-6"
            style={{ fontFamily: 'var(--font-display)', color: '#166534' }}
          >
            We&apos;d love to
            <br />
            hear from you
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--color-muted)' }}>
            Whether you have a question about programs, memberships, court availability, or just
            want to say hello — we&apos;re here.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { Icon: MapPin, text: '12 Padel Avenue, Lisbon, Portugal' },
              { Icon: Phone, text: '+351 21 000 0000' },
              { Icon: Mail, text: 'hello@padelio.com' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(61,214,140,0.12)' }}
                >
                  <Icon size={16} style={{ color: '#3DD68C' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'white', boxShadow: 'var(--shadow-elevated)' }}
        >
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
