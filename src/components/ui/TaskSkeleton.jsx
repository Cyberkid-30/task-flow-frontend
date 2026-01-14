export default function TaskSkeleton() {
  return (
    <div className="animate-pulse bg-form border border-b-color rounded-2xl p-6 space-y-4 group">
      <div className="flex items-center gap-4">
        {/* Icon skeleton */}
        <div className="shrink-0 w-6 h-6 bg-background-secondary rounded-full"></div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-background-secondary rounded-lg w-3/4"></div>
          <div className="h-3 bg-background-secondary rounded-lg w-1/2"></div>
        </div>

        {/* Arrow button skeleton */}
        <div className="shrink-0 w-10 h-10 bg-background-secondary rounded-lg"></div>
      </div>

      {/* Metadata skeleton */}
      <div className="flex items-center gap-3 pt-2 border-t border-b-color/50">
        <div className="h-3 bg-background-secondary rounded-full w-16"></div>
        <div className="h-3 bg-background-secondary rounded-full w-24"></div>
      </div>
    </div>
  );
}
