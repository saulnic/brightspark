"use client";

import Link, { type LinkProps } from "next/link";
import { useState, type ReactNode } from "react";

export function InstantLink({
  children,
  className = "",
  ...props
}: LinkProps & { children: ReactNode; className?: string }) {
  const [pending, setPending] = useState(false);

  return (
    <Link
      {...props}
      prefetch
      aria-disabled={pending}
      className={`${className} ${pending ? "navPending" : ""}`.trim()}
      onClick={(event) => {
        if (pending) {
          event.preventDefault();
          return;
        }
        setPending(true);
      }}
    >
      {children}
      {pending ? <span className="navSpinner" aria-hidden="true" /> : null}
    </Link>
  );
}
