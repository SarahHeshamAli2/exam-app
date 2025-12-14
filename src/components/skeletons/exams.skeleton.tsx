export function ExamListSkeleton() {
  return (
    <div className="bg-white pb-6 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}
