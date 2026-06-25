import Link from 'next/link';
import Image from 'next/image';
import type { Program } from '../../lib/types';

export function ProgramCard({ program }: { program: Program }) {
  return (
    <div
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={program.img}
          alt={program.imgAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
          {program.title}
        </h3>
        <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>{program.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {program.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: 'rgba(61,214,140,0.12)', color: '#166534' }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--color-muted)' }}>{program.desc}</p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 w-fit"
          style={{ background: '#3DD68C', color: '#1C1C1A' }}
        >
          View Program →
        </Link>
      </div>
    </div>
  );
}
