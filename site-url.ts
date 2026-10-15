/**
 * The public address of the site, for links inside e-mails (review page,
 * booking page, e-mail settings). From NEXT_PUBLIC_SITE_URL; only an https
 * address (or http://localhost while developing) is accepted. When it is
 * missing or unusable this returns null and the e-mails that need a link
 * are simply not sent -- a link to the wrong place is worse than none.
 */
export function publicSiteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.username || u.password) return null;
    const local = u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");
    if (u.protocol !== "https:" && !local) return null;
    return u.origin;
  } catch {
    return null;
  }
}
