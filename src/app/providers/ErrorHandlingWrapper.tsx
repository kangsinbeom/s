"use client";

import { ComponentType, Suspense } from "react";
import ErrorBoundary, { FallbackProps } from "../errorBoundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

interface PropsType {
  children: React.ReactNode;
  fallbackComponent: ComponentType<FallbackProps>;
  suspenseFallback: React.ReactNode;
}

const ErrorHandlingWrapper = ({
  children,
  fallbackComponent,
  suspenseFallback,
}: PropsType) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={fallbackComponent}>
          <Suspense fallback={suspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorHandlingWrapper;
