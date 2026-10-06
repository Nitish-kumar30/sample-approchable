/** Plain first lines of an event markdown page, for the card and meta description. */
export function eventDescriptionExcerpt(markdown: string, maxLength = 180): string {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, " ").replace(/`[^`]*`/g, " ");
  const withoutImages = withoutCode.replace(/!\[[^\]]*]\([^)]*\)/g, " ");
  const withoutLinks = withoutImages.replace(/\[([^\]]*)]\([^)]*\)/g, "$1");
  const plain = withoutLinks
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  const cut = plain.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const shortened = lastSpace > 40 ? cut.slice(0, lastSpace) : cut;
  return `${shortened.trimEnd()}…`;
}
