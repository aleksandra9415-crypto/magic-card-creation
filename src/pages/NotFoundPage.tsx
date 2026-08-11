import Link from "@/components/shared/Link";
import "@/legacy-styles/home.css";
import "@/legacy-styles/rating.css";
import HomeHeader from "@/components/layout/HomeHeader";
import HomeFooter from "@/components/layout/HomeFooter";

/* Глобальный 404 рендерится в корневом layout (вне группы (site)),
   поэтому шапку с футером и стили страницы подключаем здесь явно. */
export default function NotFound() {
  return (
    <div className="page-home">
      <HomeHeader />
      <div
        className="page-rating"
        style={{
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          padding: "80px 16px",
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 8px" }}>Страница не найдена</h1>
          <p style={{ color: "var(--muted)", margin: "0 0 20px" }}>
            Возможно, карта была удалена или ссылка неверная.
          </p>
          <Link className="btn btn-primary" href="/cards">
            К рейтингу карт
          </Link>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}
