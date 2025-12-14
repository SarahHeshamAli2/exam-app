export default function ExamQuestionsSkeleton() {
  return (
    <div>
      <div className="progress font-mono text-gray-500 text-sm bg-white py-6 px-6">
        <div className="flex justify-between mb-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="h-2 w-full bg-gray-200 rounded animate-pulse"></div>

        <div className="question-card mt-10">
          <div className="mb-4 space-y-2">
            <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-7 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 p-4 mb-2 rounded">
              <div className="size-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="buttons flex justify-between items-center gap-4 mt-6">
          <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
