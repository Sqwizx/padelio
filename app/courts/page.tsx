import Image from 'next/image';
import { courtTypes } from '../../lib/data';
import { CourtsContent } from '../../components/courts/courts-content';

export default function CourtsPage() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <div className="relative h-72 md:h-[500px] overflow-hidden">
        <Image src="/images/courts-hero.jpg" alt="Padelio courts" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Courts</h1>
            <p className="text-white/80 text-lg">18 premium courts built for performance</p>
          </div>
        </div>
      </div>
      <CourtsContent courtTypes={courtTypes} />
    </div>
  );
}
