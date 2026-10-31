/** "18 May 2026": the date format of every article byline. ISO dates parse as UTC
 * midnight, so they are formatted in UTC to print the same day on any build host. */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
