/* Контент страницы рейтинга /cards.
   Литеральный контент вынесен в data/rating.json — его правит админка.
   Здесь остаются только типы и реэкспорт с прежними именами. */

import ratingData from "./rating.json";

export type ChecklistItem = { b: string; p: string };
export type RatingFaqItem = { q: string; a: string; open?: boolean };
export type FilterChip = { f: string; label: string };

export const CHECKLIST: ChecklistItem[] = ratingData.checklist;

export const RATING_FAQ: RatingFaqItem[] = ratingData.ratingFaq;

export const FILTER_CHIPS: FilterChip[] = ratingData.filterChips;
