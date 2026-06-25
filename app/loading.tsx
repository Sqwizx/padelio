import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#E8E8E8" highlightColor="#F2F2F2">
      <div style={{ background: 'var(--color-bg)' }}>
        <div className="min-h-screen flex items-center pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="flex flex-col gap-6">
              <Skeleton width={160} height={28} borderRadius={999} />
              <div><Skeleton height={64} /><Skeleton height={64} width="80%" /></div>
              <Skeleton count={2} height={20} />
              <div className="flex gap-3">
                <Skeleton width={144} height={48} borderRadius={999} />
                <Skeleton width={144} height={48} borderRadius={999} />
              </div>
            </div>
            <Skeleton height={540} borderRadius={16} />
          </div>
        </div>
        <div className="py-10 border-y" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 md:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton width={56} height={36} />
                <Skeleton width={48} height={12} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
