"use client";
import diplomaService from "@/lib/services/diploma.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDiplomas(limit: number = 10) {
  const { data, isLoading, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery({
      queryKey: ["diplomas", limit],
      queryFn: ({ pageParam }) => diplomaService(pageParam, limit),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { currentPage, numberOfPages } = lastPage.metadata;
        if (currentPage < numberOfPages) {
          return currentPage + 1;
        }
        return undefined;
      },
    });

  return {
    diplomas: data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    error,
  };
}
