// Next.js's dynamic route params can arrive still percent-encoded for
// non-ASCII (e.g. Persian) segments, so decode defensively before use.
export function decodeSlug(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

// Slug-friendly for Persian + Latin text: keeps Persian/Arabic letters and digits,
// lowercases Latin, replaces whitespace/underscore with hyphens, strips the rest.
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9؀-ۿ-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
