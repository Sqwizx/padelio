import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#E8E8E8" highlightColor="#F2F2F2">
      <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <Skeleton width={96} height={24} borderRadius={999} style={{ marginBottom: 16 }} />
            <Skeleton width={320} height={48} style={{ marginBottom: 24 }} />
            <Skeleton count={3} height={20} style={{ marginBottom: 6 }} />
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ padding: 32, borderRadius: 16, background: 'var(--color-surface)' }}>
                <Skeleton width={48} height={48} borderRadius={12} style={{ marginBottom: 16 }} />
                <Skeleton width="75%" height={24} style={{ marginBottom: 12 }} />
                <Skeleton count={3} height={16} style={{ marginBottom: 4 }} />
              </div>
            ))}
          </div>
          <Skeleton width={224} height={32} style={{ display: 'block', margin: '0 auto 40px' }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <Skeleton width={96} height={96} borderRadius={12} />
                <Skeleton width={112} height={16} />
                <Skeleton width={80} height={12} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
