import {
  useRouterState,
  useNavigate,
  notFound as tsrNotFound,
  redirect as tsrRedirect,
} from "@tanstack/react-router";

/** Аналог next/navigation usePathname(). */
export function usePathname(): string {
  return useRouterState({ select: (s) => s.location.pathname });
}

/** Аналог next/navigation useRouter() с методами push/replace/refresh/back. */
export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (href: string) => navigate({ to: href as never }),
    replace: (href: string) => navigate({ to: href as never, replace: true }),
    refresh: () => {
      if (typeof window !== "undefined") window.location.reload();
    },
    back: () => {
      if (typeof window !== "undefined") window.history.back();
    },
    prefetch: () => {},
  };
}

/** Аналог next/navigation notFound(). */
export function notFound(): never {
  throw tsrNotFound();
}

/** Аналог next/navigation redirect(). */
export function redirect(to: string): never {
  throw tsrRedirect({ to: to as never });
}
