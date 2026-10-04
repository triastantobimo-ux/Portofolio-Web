/* Utilitas tanggal murni — aman dipakai di client & server */

export function formatArticleDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
