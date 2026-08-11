import { createFileRoute, Outlet } from "@tanstack/react-router";

import "@/legacy-styles/home.css";
import "@/legacy-styles/rating.css";
import "@/legacy-styles/rating-form.css";
/* После rating.css: на посадочной странице оба скоупа стоят на одном узле,
   и .lp должен переопределять базовые размеры .page-rating. */
import "@/legacy-styles/landing.css";
import "@/legacy-styles/review.css";
import "@/legacy-styles/countries.css";
import "@/legacy-styles/blog.css";

import HomeHeader from "@/components/layout/HomeHeader";
import HomeFooter from "@/components/layout/HomeFooter";
import MobileTabBar from "@/components/layout/MobileTabBar";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

/** Layout публичной части сайта. Админка (/admin) живёт вне этой группы. */
function SiteLayout() {
  return (
    <div className="page-home">
      <HomeHeader />
      <Outlet />
      <HomeFooter />
      <MobileTabBar />
    </div>
  );
}
