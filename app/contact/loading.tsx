import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#E8E8E8" highlightColor="#F2F2F2">
      <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <Skeleton width={112} height={24} borderRadius={999} style={{ marginBottom: 24 }} />
            <Skeleton width={256} height={48} style={{ marginBottom: 8 }} />
            <Skeleton width={192} height={48} style={{ marginBottom: 40 }} />
            <Skeleton count={2} height={20} style={{ marginBottom: 6 }} />
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Skeleton width={36} height={36} borderRadius={8} />
                  <Skeleton width={192} height={16} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 16, padding: 32, background: 'white', boxShadow: 'var(--shadow-elevated)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div><Skeleton width={48} height={12} style={{ marginBottom: 6 }} /><Skeleton height={48} borderRadius={12} /></div>
              <div><Skeleton width={40} height={12} style={{ marginBottom: 6 }} /><Skeleton height={48} borderRadius={12} /></div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Skeleton width={96} height={12} style={{ marginBottom: 6 }} />
              <Skeleton height={48} borderRadius={12} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <Skeleton width={64} height={12} style={{ marginBottom: 6 }} />
              <Skeleton height={128} borderRadius={12} />
            </div>
            <Skeleton height={48} borderRadius={999} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
