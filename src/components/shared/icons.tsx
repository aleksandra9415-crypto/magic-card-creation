/* Общие мелкие визуальные атомы, переиспользуемые на всех страницах */

/** Полный логотип NH (главная страница + футер главной) */
export function NHLogoSvg({ gradientId }: { gradientId: string }) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF3B3B" />
          <stop offset="1" stopColor="#B80012" />
        </linearGradient>
      </defs>
      <path
        d="M7 9 L7 31 L11.6 31 L11.6 17.4 L20.6 31 L25.2 31 L25.2 9 L20.6 9 L20.6 22.6 L11.6 9 Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M24 9 L24 31 L28.6 31 L28.6 21.8 L33.4 21.8 L33.4 31 L38 31 L38 9 L33.4 9 L33.4 17.6 L28.6 17.6 L28.6 9 Z"
        fill="#F1F3F8"
        stroke="#0B1530"
        strokeWidth=".6"
      />
      <circle cx="24" cy="31" r="1.6" fill="#7FB5FF" opacity=".9" />
    </svg>
  );
}

/** Компактный знак N (шапка внутренних страниц) */
export function NHMarkSmall() {
  return (
    <svg width="17" height="17" viewBox="0 0 40 40">
      <path
        d="M7 9 L7 31 L11.6 31 L11.6 17.4 L20.6 31 L25.2 31 L25.2 9 L20.6 9 L20.6 22.6 L11.6 9 Z"
        fill="#FF3B3B"
      />
    </svg>
  );
}

/** Стрелка "вперёд" 14x14, используется в кнопках и карточках */
export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M1 7h12M8 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Стрелка 16x16 (кнопки "Все статьи", "Все 23 страны") */
export function ArrowRight16() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M1 8h13M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Щит "Проверено" (мета карточек сервиса на главной) */
export function VerifiedShield() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L4 6v6c0 4.5 3.4 8.7 8 10 4.6-1.3 8-5.5 8-10V6l-8-4z"
        fill="currentColor"
      />
      <path
        d="M8 12l2.5 2.5L16 9"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Внешняя ссылка 11x11 (trust-чипы) */
export function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Логотип Apple (значок Apple Pay в таблице рейтинга) */
export function AppleMark({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** Галочка в зелёном круге (таблица рейтинга, hero обзора) */
export function CheckBadge({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10">
      <path
        d="M1.5 5.2 4 7.7 8.6 2.6"
        stroke="#fff"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
