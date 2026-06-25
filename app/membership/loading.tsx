import { Skeleton } from '../../components/ui/skeleton';

export default function Loading() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-6 w-32 rounded-full mx-auto mb-4" />
          <Skeleton className="h-12 w-72 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: i === 1 ? 'white' : 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-12 w-28" />
              </div>
              <div className="flex flex-col gap-3">
                {Array.from({ length: i === 2 ? 6 : i === 1 ? 5 : 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-full mt-2" />
            </div>
          ))}
        </div>
        <div className="mb-20">
          <Skeleton className="h-8 w-48 mx-auto mb-8" />
          <div className="overflow-x-auto">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex gap-8 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-12 mx-auto" />
                  <Skeleton className="h-4 w-12 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <Skeleton className="h-8 w-72 mx-auto mb-8" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="py-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
