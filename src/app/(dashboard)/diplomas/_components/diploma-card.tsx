"use client";
import { DiplomaCardSkeleton } from "@/components/skeletons/diplomas.skeleton";

import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDiplomas } from "../_hooks/use-diplomas";
import EmptyState from "../../_components/empty-state";

const DIPLOMAS_PER_PAGE = 3;

export default function DiplomaCard() {
  const { error, isLoading, hasNextPage, fetchNextPage, diplomas } =
    useDiplomas(DIPLOMAS_PER_PAGE);

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {Array.from({ length: DIPLOMAS_PER_PAGE }).map((_, index) => (
          <DiplomaCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const subjects = diplomas?.pages.flatMap((page) => page.subjects) || [];

  if (subjects.length === 0) {
    return <EmptyState type="no-diplomas" />;
  }

  return (
    <InfiniteScroll
      loader={
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 mt-3">
          {Array.from({ length: DIPLOMAS_PER_PAGE }).map((_, index) => (
            <DiplomaCardSkeleton key={`loader-${index}`} />
          ))}
        </div>
      }
      endMessage={
        <div className="text-center py-4 text-gray-500">
          No more diplomas to load
        </div>
      }
      dataLength={subjects.length}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            href={`exams`}
            key={subject._id}
            className="relative aspect-square flex justify-center md:w-full md:h-diplomaImage">
            <Image
              fill
              src={subject.icon}
              alt={subject.name}
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzM2IiBoZWlnaHQ9IjMzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzM2IiBoZWlnaHQ9IjMzNiIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
              priority={false}
            />
            <div className="absolute bottom-2 w-11/12 bg-blue-600/50 py-5 ps-4 font-mono font-semibold text-white">
              {subject.name}
            </div>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
}
