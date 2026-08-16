import type { ReactNode } from "react";
import type { Collection } from "@/data/home";

/* Хиро-визуалы подборок — перенесены 1:1 из исходной вёрстки.
   Выбираются по heroVariant карточки. */

const barStyle = (bg: string, height: string) =>
  ({
    background: bg,
    width: "18%",
    borderRadius: "4px 4px 0 0",
    height,
  }) as const;

const gameTile = (bg: string, color: string, extra?: object) =>
  ({
    background: bg,
    color,
    fontWeight: 800,
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 13,
    ...extra,
  }) as const;

export const COLLECTION_HEROES: Record<Collection["heroVariant"], ReactNode> = {
  ai: (
    <div className="coll__hero coll__hero--ai">
      <div className="ai-blob"></div>
      <div className="ai-orb"></div>
    </div>
  ),
  media: (
    <div className="coll__hero coll__hero--media">
      <div className="coll-tiles">
        <div className="coll-tile coll-tile--red coll-tile--wide">Netflix</div>
        <div className="coll-tile coll-tile--green">♪</div>
        <div className="coll-tile coll-tile--ink">Disney+</div>
        <div className="coll-tile coll-tile--dark">HBO</div>
        <div className="coll-tile coll-tile--red">▶</div>
      </div>
    </div>
  ),
  ads: (
    <div className="coll__hero coll__hero--ads">
      <svg
        className="bg-pattern"
        viewBox="0 0 400 225"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#FC6116" />
            <stop offset="1" stopColor="#56AFB1" />
          </linearGradient>
        </defs>
        <path
          d="M0 180 C 60 120 120 200 200 140 S 340 80 400 100 L 400 225 L 0 225 Z"
          fill="url(#g1)"
          opacity=".25"
        />
        <path
          d="M0 200 C 80 160 140 220 220 170 S 340 130 400 150 L 400 225 L 0 225 Z"
          fill="#FC6116"
          opacity=".18"
        />
      </svg>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
          padding: 14,
          width: "100%",
          height: "100%",
        }}
      >
        <div style={barStyle("#BCDFE0", "55%")}></div>
        <div style={barStyle("#FC6116", "75%")}></div>
        <div style={barStyle("#062132", "40%")}></div>
        <div style={barStyle("#BCDFE0", "85%")}></div>
        <div style={barStyle("#6e55ff", "60%")}></div>
      </div>
    </div>
  ),
  games: (
    <div className="coll__hero coll__hero--games">
      <svg
        className="bg-pattern"
        viewBox="0 0 400 225"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle cx="80" cy="60" r="40" fill="#FC6116" opacity=".4" />
        <circle cx="320" cy="170" r="60" fill="#FC6116" opacity=".5" />
        <circle cx="200" cy="120" r="20" fill="#fff" opacity=".15" />
      </svg>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          padding: 14,
        }}
      >
        <div style={gameTile("#171a21", "#66c0f4", { letterSpacing: "-0.02em" })}>
          STEAM
        </div>
        <div style={gameTile("#000", "#fff")}>EPIC</div>
        <div style={gameTile("#003791", "#fff")}>PS</div>
        <div style={gameTile("#107c10", "#fff")}>XBOX</div>
      </div>
    </div>
  ),
  shop: (
    <div className="coll__hero coll__hero--shop">
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "12px 16px",
            boxShadow: "0 8px 20px rgba(11, 21, 48, 0.1)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontSize: 18,
            color: "#ff9900",
          }}
        >
          amazon
        </div>
        <div
          style={{
            background: "#062132",
            color: "#fff",
            borderRadius: "50%",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 18,
            boxShadow: "0 8px 20px rgba(11, 21, 48, 0.2)",
            transform: "rotate(-6deg)",
          }}
        >
          e
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            padding: "8px 12px",
            fontWeight: 800,
            fontSize: 12,
            color: "#e5484d",
            boxShadow: "0 8px 20px rgba(11, 21, 48, 0.1)",
            transform: "rotate(4deg)",
          }}
        >
          Etsy
        </div>
      </div>
    </div>
  ),
  travel: (
    <div className="coll__hero coll__hero--travel">
      <svg
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <path
          d="M0 160 Q 100 100 200 130 T 400 110"
          stroke="#FC6116"
          strokeWidth="2"
          strokeDasharray="6 8"
          fill="none"
          opacity=".7"
        />
        <circle cx="60" cy="155" r="6" fill="#FC6116" />
        <circle cx="200" cy="130" r="6" fill="#FC6116" />
        <circle cx="340" cy="115" r="6" fill="#FC6116" />
        <path
          d="M280 70 l 30 -12 l 6 6 l -10 14 l 14 14 l -8 8 l -22 -10 l -10 14 l -6 -2 l 4 -16 l -10 -6 z"
          fill="#062132"
          opacity=".85"
        />
        <ellipse cx="220" cy="200" rx="180" ry="14" fill="#fff" opacity=".4" />
      </svg>
    </div>
  ),
};
