import { Skeleton } from '../../components/ui/skeleton';

export default function Loading() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <Skeleton className="h-6 w-28 rounded-full mb-6" />
          <Skeleton className="h-12 w-64 mb-2" />
          <Skeleton className="h-12 w-48 mb-10" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-5/6 mb-10" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg flex-shrink-0" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: 'white', boxShadow: 'var(--shadow-elevated)' }}>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
