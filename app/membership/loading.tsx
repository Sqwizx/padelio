import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#E8E8E8" highlightColor="#F2F2F2">
      <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton width={128} height={24} borderRadius={999} style={{ marginBottom: 16 }} />
            <Skeleton width={288} height={48} style={{ marginBottom: 16 }} />
            <Skeleton width={320} height={20} />
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ borderRadius: 16, padding: 32, background: i === 1 ? 'white' : 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}>
                <Skeleton width={64} height={16} style={{ marginBottom: 8 }} />
                <Skeleton width={112} height={48} style={{ marginBottom: 20 }} />
                {Array.from({ length: i === 2 ? 6 : i === 1 ? 5 : 4 }).map((_, j) => (
                  <Skeleton key={j} height={16} style={{ marginBottom: 8 }} />
                ))}
                <Skeleton height={48} borderRadius={999} style={{ marginTop: 16 }} />
              </div>
            ))}
          </div>
          <Skeleton width={192} height={32} style={{ display: 'block', margin: '0 auto 32px' }} />
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 32, paddingBlock: 14, borderBottom: '1px solid var(--color-border)' }}>
              <Skeleton width={192} height={16} />
              <Skeleton width={48} height={16} />
              <Skeleton width={48} height={16} />
              <Skeleton width={64} height={16} />
            </div>
          ))}
          <div className="max-w-2xl mx-auto mt-16">
            <Skeleton width={288} height={32} style={{ display: 'block', margin: '0 auto 32px' }} />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 20, borderBottom: '1px solid var(--color-border)' }}>
                <Skeleton width="70%" height={20} />
                <Skeleton width={20} height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
