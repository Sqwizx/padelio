import Link from 'next/link';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { footerColumns } from '../lib/data';

const socialIcons = [
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Twitter, label: 'Twitter', href: '#' },
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export function Footer() {
  return (
    <footer style={{ background: '#166534', color: '#F5F0E8' }} className="pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-60">{col.heading}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm opacity-80 hover:opacity-100 hover:text-[#3DD68C] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-display)' }}>PADELIO</p>
          <div className="flex items-center gap-4">
            {socialIcons.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-xs opacity-50">© {new Date().getFullYear()} Padelio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
