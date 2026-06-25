import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#E8E8E8" highlightColor="#F2F2F2">
      <div className="pt-24 pb-24" style={{ background: 'var(--color-bg)' }}>
        <Skeleton height={384} borderRadius={0} />
        <div className="max-w-3xl mx-auto px-6 mt-10">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 32 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width={96} height={28} borderRadius={999} />
            ))}
          </div>
          <Skeleton count={3} height={20} style={{ marginBottom: 6 }} />
          <div style={{ borderRadius: 16, padding: 24, background: 'var(--color-surface)', marginTop: 40, marginBottom: 40 }}>
            <Skeleton width={160} height={24} style={{ marginBottom: 16 }} />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: 32, paddingBlock: 12, borderBottom: '1px solid var(--color-border)' }}>
                <Skeleton width={80} height={16} />
                <Skeleton width={120} height={16} />
                <Skeleton width={60} height={16} />
              </div>
            ))}
          </div>
          <Skeleton width={192} height={48} borderRadius={999} />
        </div>
      </div>
    </SkeletonTheme>
  );
}
