import { Skeleton } from '../../../components/ui/skeleton';

export default function Loading() {
  return (
    <div className="pt-24 pb-24" style={{ background: 'var(--color-bg)' }}>
      <Skeleton className="w-full h-72 md:h-96" />
      <div className="max-w-3xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-24 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-5/6 mb-2" />
        <Skeleton className="h-5 w-4/5 mb-10" />
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'var(--color-surface)' }}>
          <Skeleton className="h-6 w-40 mb-4" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-8 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        <Skeleton className="h-12 w-48 rounded-full" />
      </div>
    </div>
  );
}
