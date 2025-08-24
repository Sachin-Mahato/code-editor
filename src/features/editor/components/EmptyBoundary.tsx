import React from "react";

interface EmptyBoundaryProps {
    isEmpty: boolean;
    emptyFallback: React.ReactNode
    children: React.ReactNode
}
export default function EmptyBoundary({ isEmpty, emptyFallback, children }: EmptyBoundaryProps) {
    return isEmpty ?
        <> {emptyFallback}</>
        : <>{children}</>
}