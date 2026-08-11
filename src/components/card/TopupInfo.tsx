import type { ReactNode } from "react";

export default function TopupInfo({ text }: { text: ReactNode }) {
  return (
    <section className="sec" id="topup">
      <h2>Как пополнить</h2>
      <div className="topup-box">
        <span className="topup-ic">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2v20M2 12h20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p>{text}</p>
      </div>
    </section>
  );
}
