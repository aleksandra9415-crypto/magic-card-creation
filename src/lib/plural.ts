/* Склонение числительных. Спека запрещает конкатенацию «N сервисов»:
   счётчики стоят в кнопке «Показать все N сервисов», в выпадашках и в
   списках стран, и везде нужна правильная форма. */

/** Выбирает форму слова: [1 сервис, 2 сервиса, 5 сервисов]. */
export const pluralForm = (
  n: number,
  forms: [one: string, few: string, many: string],
) => {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
};

/** «21 сервис» — число вместе со склонённым словом. */
export const plural = (
  n: number,
  forms: [one: string, few: string, many: string],
) => `${n} ${pluralForm(n, forms)}`;

export const cardsLabel = (n: number) => plural(n, ["карта", "карты", "карт"]);
export const servicesLabel = (n: number) =>
  plural(n, ["сервис", "сервиса", "сервисов"]);
export const collectionsLabel = (n: number) =>
  plural(n, ["подборка", "подборки", "подборок"]);
