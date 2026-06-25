import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#E8E8E8" highlightColor="#F2F2F2">
      <div style={{ background: 'var(--color-bg)' }}>
        <Skeleton height={500} borderRadius={0} />
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
          <div>
            <Skeleton width={96} height={24} borderRadius={999} style={{ marginBottom: 24 }} />
            <Skeleton width={220} height={40} style={{ marginBottom: 32 }} />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: 16, borderRadius: 12, background: 'var(--color-surface)', marginBottom: 12 }}>
                <Skeleton circle width={24} height={24} />
                <div style={{ flex: 1 }}>
                  <Skeleton width="75%" height={16} style={{ marginBottom: 4 }} />
                  <Skeleton width="50%" height={12} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 16, padding: 32, background: 'white', boxShadow: 'var(--shadow-elevated)' }}>
            <Skeleton width={144} height={24} style={{ marginBottom: 20 }} />
            <Skeleton height={48} borderRadius={12} style={{ marginBottom: 20 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 20 }}>
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} height={40} borderRadius={8} />)}
            </div>
            <Skeleton height={48} borderRadius={12} style={{ marginBottom: 20 }} />
            <Skeleton height={48} borderRadius={999} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
