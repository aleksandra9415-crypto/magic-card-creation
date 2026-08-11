import type { ReactNode } from "react";
import { FEATURES, type Feature } from "@/data/home";
import SectionWrapper from "@/components/shared/SectionWrapper";

const ICONS: Record<Feature["icon"], ReactNode> = {
  card: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="6"
        width="20"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  "arrow-up": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v20M5 9l7-7 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  spark: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v4M12 18v4M22 12h-4M6 12H2M19 5l-3 3M8 16l-3 3M19 19l-3-3M8 8L5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  refresh: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12a9 9 0 1 1-3.5-7.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 4v5h-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="feature">
      <div className="feature__icon">{ICONS[feature.icon]}</div>
      <h3 className="feature__title">{feature.title}</h3>
      <p className="feature__desc">{feature.desc}</p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <SectionWrapper
      id="why"
      centered
      title="Почему именно NHcard"
      description="Один источник правды для всех зарубежных платёжных сервисов. Без рекламных приоритетов — рейтинг строится на проверке и отзывах."
    >
      <div className="features__grid grid-spacing">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </SectionWrapper>
  );
}
