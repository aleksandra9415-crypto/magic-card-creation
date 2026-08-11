import { Link as RouterLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
  children?: ReactNode;
};

/** Совместимая с next/link обёртка над TanStack Router Link.
 *  Внешние ссылки и якоря рендерятся обычным <a>. */
export default function Link({ href, prefetch, scroll, replace, ...rest }: Props) {
  const isInternal = typeof href === "string" && href.startsWith("/");
  if (!isInternal) {
    return <a href={href} {...rest} />;
  }
  const Any = RouterLink as unknown as React.ComponentType<Record<string, unknown>>;
  return <Any to={href} replace={replace} {...rest} />;
}
