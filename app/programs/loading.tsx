import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#E8E8E8" highlightColor="#F2F2F2">
      <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Skeleton width={128} height={24} borderRadius={999} style={{ marginBottom: 16 }} />
            <Skeleton width={280} height={48} style={{ marginBottom: 16 }} />
            <Skeleton width={320} height={20} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--color-surface)' }}>
                <Skeleton height={220} borderRadius={0} />
                <div className="p-6" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton width="75%" height={24} />
                  <Skeleton width="50%" height={16} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Skeleton width={80} height={24} borderRadius={999} />
                    <Skeleton width={96} height={24} borderRadius={999} />
                    <Skeleton width={72} height={24} borderRadius={999} />
                  </div>
                  <Skeleton count={2} height={16} />
                  <Skeleton width={140} height={40} borderRadius={999} style={{ marginTop: 8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
