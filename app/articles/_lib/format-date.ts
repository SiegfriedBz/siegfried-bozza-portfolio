/** "18 May 2026": the date format of every article byline. */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
