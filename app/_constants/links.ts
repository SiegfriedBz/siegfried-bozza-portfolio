/**
 * Public profile URLs. They are public anyway, so they live in code instead of
 * env vars: a missing Vercel variable can no longer make a link vanish silently.
 */
export const PROFILE_LINKS = {
  github: "https://github.com/SiegfriedBz",
  linkedin: "https://www.linkedin.com/in/siegfriedbozza",
  email: "siegfried.bozza@protonmail.com",
  calendly: "https://calendly.com/siegfried-bozza/30min",
} as const;

/** BioVerify's public Telegram bot, as linked from the BioVerify README. */
export const BIOVERIFY_TELEGRAM_URL = "https://t.me/BioVerifyBot";
