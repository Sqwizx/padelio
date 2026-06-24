import { notFound } from 'next/navigation';
import Link from 'next/link';
import { programs } from '../../../lib/data';

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <div className="pt-24 pb-24" style={{ background: 'var(--color-bg)' }}>
      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden mb-12">
        <img src={program.img} alt={program.imgAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h1
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {program.title}
          </h1>
          <p className="text-white/80 mt-2">{program.subtitle}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {program.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-4 py-1.5 rounded-full font-medium"
              style={{ background: 'rgba(61,214,140,0.12)', color: '#166534' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--color-muted)' }}>
          {program.desc}
        </p>

        {/* Placeholder schedule */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'var(--color-surface)' }}>
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#166534' }}
          >
            Sample Schedule
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="text-left py-2 font-semibold">Day</th>
                <th className="text-left py-2 font-semibold">Time</th>
                <th className="text-left py-2 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Monday', '09:00 – 10:30', '90 min'],
                ['Wednesday', '18:00 – 19:30', '90 min'],
                ['Saturday', '10:00 – 12:00', '120 min'],
              ].map(([day, time, dur]) => (
                <tr key={day} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3">{day}</td>
                  <td className="py-3" style={{ color: 'var(--color-muted)' }}>{time}</td>
                  <td className="py-3" style={{ color: 'var(--color-muted)' }}>{dur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <Link
          href={`/contact?inquiry=program&program=${program.slug}`}
          className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
          style={{ background: '#3DD68C', color: '#1C1C1A', boxShadow: '0 4px 20px rgba(61,214,140,0.3)' }}
        >
          Book This Program →
        </Link>
      </div>
    </div>
  );
}
