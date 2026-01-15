export default function TaskDetailItemSkeleton() {
  return (
    <div className="w-full max-w-3xl animate-pulse">
      {/* Header Section */}
      <div className="bg-form border border-b-color rounded-2xl p-8 shadow-lg">
        {/* Title and Status Badge */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            {/* Title Skeleton */}
            <div className="h-9 bg-b-color/30 rounded-lg mb-3 w-3/4"></div>

            {/* Status Badge Skeleton */}
            <div className="h-8 bg-b-color/20 rounded-full w-32"></div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-11 w-11 bg-b-color/20 rounded-xl"></div>
            <div className="h-11 w-11 bg-b-color/20 rounded-xl"></div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-6 p-4 bg-background/50 rounded-xl border border-b-color/50">
          <div className="space-y-2">
            <div className="h-4 bg-b-color/20 rounded w-full"></div>
            <div className="h-4 bg-b-color/20 rounded w-5/6"></div>
            <div className="h-4 bg-b-color/20 rounded w-4/6"></div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Due Date Card Skeleton */}
          <div className="bg-background/30 border border-b-color/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-b-color/20 rounded-lg shrink-0"></div>
              <div className="flex-1">
                <div className="h-3 bg-b-color/20 rounded w-20 mb-2"></div>
                <div className="h-5 bg-b-color/20 rounded w-32"></div>
              </div>
            </div>
          </div>

          {/* Owner Card Skeleton */}
          <div className="bg-background/30 border border-b-color/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-b-color/20 rounded-lg shrink-0"></div>
              <div className="flex-1">
                <div className="h-3 bg-b-color/20 rounded w-20 mb-2"></div>
                <div className="h-5 bg-b-color/20 rounded w-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
