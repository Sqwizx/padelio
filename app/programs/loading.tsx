import { Skeleton } from '../../components/ui/skeleton';

export default function Loading() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <Skeleton className="h-6 w-32 rounded-full mx-auto mb-4" />
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface)' }}>
              <Skeleton className="w-full aspect-video" />
              <div className="p-6 flex flex-col gap-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-36 rounded-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
