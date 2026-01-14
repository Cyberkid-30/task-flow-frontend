/**
 * Converts a word to title case (first letter uppercase, rest lowercase).
 * @param {string} word - The word to convert.
 * @returns {string} The word in title case.
 */
export function toTitleCase(word) {
  if (!word || typeof word !== "string") return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function getDefaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}
