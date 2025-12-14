export function DiplomaCardSkeleton() {
  return (
    <div className="relative aspect-square flex justify-center md:w-full md:h-diplomaImage">
      <div className="absolute inset-0 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      <div className="absolute bottom-2 w-11/12 bg-gray-300/50 py-5 ps-4">
        <div className="h-4 w-3/4 bg-gray-400/70 rounded" />
      </div>
    </div>
  );
}
