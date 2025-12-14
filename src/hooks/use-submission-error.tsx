// hooks/use-submission-error.ts
"use client";

import { CircleX } from "lucide-react";
import { useState, useCallback } from "react";

export function useSubmissionError() {
  const [errorMessage, setErrorMessage] = useState<string | number>("");

  const clearError = useCallback(() => setErrorMessage(""), []);

  const displayedErrorMessage = useCallback(() => {
    if (!errorMessage) return null;

    return (
      <div className="my-8">
        <p className="text-destructive bg-red-50 p-3 text-center border border-red-600 relative">
          <CircleX
            cursor={"pointer"}
            onClick={clearError}
            className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
            aria-hidden="true"
          />
          <span className="sr-only">Error: </span>
          {errorMessage}
        </p>
      </div>
    );
  }, [errorMessage, clearError]);

  return {
    errorMessage,
    setErrorMessage,
    clearError,
    displayedErrorMessage,
  };
}
