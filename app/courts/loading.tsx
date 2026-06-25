import { Skeleton } from '../../components/ui/skeleton';

export default function Loading() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Skeleton className="w-full h-72 md:h-[500px]" />
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        <div>
          <Skeleton className="h-6 w-24 rounded-full mb-6" />
          <Skeleton className="h-10 w-56 mb-8" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--color-surface)' }}>
                <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: 'white', boxShadow: 'var(--shadow-elevated)' }}>
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-10 rounded-lg" />)}
          </div>
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
