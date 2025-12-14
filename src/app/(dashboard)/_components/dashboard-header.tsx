"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { usePageContext } from "../_hooks/use-page-context";
import { findMatchingRoute } from "@/lib/route.config";
import { getPageTitle } from "@/lib/utils/get-page-title";

export default function DashboardHeader() {
  const router = useRouter();
  const { pathname, shouldFetchExamTitle, examTitle, isLoadingExamTitle } =
    usePageContext();

  const currentRoute = findMatchingRoute(pathname);
  const pageTitle = getPageTitle(pathname, shouldFetchExamTitle, examTitle);
  const PageIcon = currentRoute.icon;
  const showBackButton = pageTitle !== "Diplomas";

  return (
    <div className="flex gap-2 mb-6">
      {showBackButton && (
        <Button
          variant="outline"
          className="bg-white hover:bg-white w-9 h-auto"
          onClick={() => router.back()}>
          <ChevronLeft className="text-blue-600" />
        </Button>
      )}
      <div className="bg-blue-600 text-white p-5 flex items-center gap-3 w-full">
        <PageIcon size={currentRoute.iconSize} />
        <h1 className="text-2xl font-semibold">
          {isLoadingExamTitle && shouldFetchExamTitle ? (
            <Spinner className="size-8" />
          ) : (
            pageTitle
          )}
        </h1>
      </div>
    </div>
  );
}
