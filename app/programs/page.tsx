import { programs } from '../../lib/data';
import { ProgramsGrid } from '../../components/programs/programs-grid';

export default function ProgramsPage() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Training Programs
          </span>
          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Find your program
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Whether you're picking up a racket for the first time or competing at a high level, we have a program built for you.
          </p>
        </div>
        <ProgramsGrid programs={programs} />
      </div>
    </div>
  );
}
