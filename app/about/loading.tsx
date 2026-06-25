import { Skeleton } from '../../components/ui/skeleton';

export default function Loading() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Skeleton className="h-6 w-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-12 w-80 mx-auto mb-6" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-5/6 mx-auto mb-2" />
          <Skeleton className="h-5 w-4/5 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-8 rounded-2xl flex flex-col gap-4" style={{ background: 'var(--color-surface)' }}>
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
        <Skeleton className="h-8 w-56 mx-auto mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Skeleton className="w-24 h-24 rounded-2xl" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
