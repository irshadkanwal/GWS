/**
 * @function sortNumbers
 * @template T
 * @param {T[]} items - A collection of typed objects
 * @param {keyof T} fieldName - The object key to sort by
 * @param {'asc' | 'desc'} direction - Sort direction
 * @returns {T[]} A sorted array of typed objects
 */
export const sortNumbers = <T extends Record<string, any>>(
  items: T[],
  fieldName: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = Number(a[fieldName]);
    const bVal = Number(b[fieldName]);

    if (isNaN(aVal) || isNaN(bVal)) return 0;

    return direction === "asc" ? aVal - bVal : bVal - aVal;
  });
};
