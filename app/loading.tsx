import { Skeleton } from '../components/ui/skeleton';

export default function Loading() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>
      {/* Hero skeleton */}
      <div className="min-h-screen flex items-center pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-6 w-40 rounded-full" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-4/5" />
            </div>
            <Skeleton className="h-5 w-full max-w-md" />
            <Skeleton className="h-5 w-3/4 max-w-md" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-36 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
          <Skeleton className="rounded-2xl aspect-[4/5] md:h-[540px] w-full" />
        </div>
      </div>
      {/* Stats strip skeleton */}
      <div className="py-10 border-y" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 md:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
