import { AboutContent } from '../../components/about/about-content';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div id="mission" className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>Our Story</span>
          <h1 className="text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Built for the love of padel
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Founded in 2018 by a group of padel enthusiasts who believed the sport deserved a home worthy of its potential. Padelio started with 4 courts and 30 members. Today we have 18 courts, 300+ members, and a coaching team that has trained players from beginner to national level.
          </p>
        </div>
        <AboutContent />
      </div>
    </div>
  );
}
