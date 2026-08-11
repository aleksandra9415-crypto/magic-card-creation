import type { ReactNode } from "react";
import { ArrowRight } from "@/components/shared/icons";

export type CollectionCardData = {
  cat: string;
  title: string;
  list: string;
  count: string;
  pill?: string;
  href: string;
};

/** Универсальная карточка-подборка (.coll): используется для категорий,
    стран и статей блога. Хиро-визуал передаётся снаружи. */
export default function CollectionCard({
  data,
  hero,
  meta,
  className,
}: {
  data: CollectionCardData;
  hero: ReactNode;
  /** необязательная строка меты вместо .coll__cat (для статей блога) */
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <a className={`coll${className ? " " + className : ""}`} href={data.href}>
      {hero}
      <div className="coll__body">
        {meta ?? <div className="coll__cat">{data.cat}</div>}
        <h3 className="coll__title">{data.title}</h3>
        <p className="coll__list">{data.list}</p>
        <div className="coll__foot">
          <span className="coll__count">
            {data.count} <ArrowRight />
          </span>
          {data.pill ? <span className="coll__pill">{data.pill}</span> : null}
        </div>
      </div>
    </a>
  );
}
