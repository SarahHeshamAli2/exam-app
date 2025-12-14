"use client";
import Link from "next/link";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { usePageContext } from "../_hooks/use-page-context";
import { formatSegmentLabel } from "@/lib/utils/get-page-title";

function getDisplaySegments(
  pathSegments: string[],
  shouldFetchExamTitle: boolean,
  examTitle?: string
) {
  if (shouldFetchExamTitle && examTitle) {
    return ["exams", examTitle, "questions"];
  }
  return pathSegments;
}

function getBreadcrumbHref(
  index: number,
  shouldFetchExamTitle: boolean,
  examId: string | undefined,
  pathSegments: string[]
) {
  if (!shouldFetchExamTitle) {
    return "/" + pathSegments.slice(0, index + 1).join("/");
  }

  if (index === 0) return "/exams";
  return `/exams/questions/${examId}`;
}

export function BreadCrumbs() {
  const {
    pathname,
    examId,
    shouldFetchExamTitle,
    examTitle,
    isLoadingExamTitle,
  } = usePageContext();

  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathname === "/diplomas") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/diplomas" className="text-blue-600 font-semibold">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const displaySegments = getDisplaySegments(
    pathSegments,
    shouldFetchExamTitle,
    examTitle
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/diplomas">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {isLoadingExamTitle && shouldFetchExamTitle ? (
          <>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Spinner className="size-4" />
            </BreadcrumbItem>
          </>
        ) : (
          displaySegments.map((segment, index) => {
            const href = getBreadcrumbHref(
              index,
              shouldFetchExamTitle,
              examId,
              pathSegments
            );
            const label = formatSegmentLabel(segment);
            const isActive = index === displaySegments.length - 1;

            return (
              <React.Fragment key={`${href}-${index}`}>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      className={isActive ? "text-blue-600 font-semibold" : ""}>
                      {label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
