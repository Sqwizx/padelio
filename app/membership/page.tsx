import { plans } from '../../lib/data';
import { MembershipContent } from '../../components/membership/membership-content';

export default function MembershipPage() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>Membership Plans</span>
          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Simple, honest pricing
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            No hidden fees. Cancel anytime. Choose the plan that fits your game.
          </p>
        </div>
        <MembershipContent plans={plans} />
      </div>
    </div>
  );
}
