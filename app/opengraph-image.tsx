import { ImageResponse } from "next/og";
import {
  AVAILABILITY,
  CORE_STACK,
  DAY_JOB,
  PITCH,
  ROLE,
} from "./_lib/site-metadata";

export const alt = `Siegfried Bozza, ${ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0c4a6e 100%)",
        color: "#f8fafc",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          maxWidth: 900,
        }}
      >
        Siegfried Bozza
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 32,
          fontWeight: 400,
          color: "#7dd3fc",
          maxWidth: 900,
          lineHeight: 1.3,
        }}
      >
        {ROLE}
      </div>
      <div
        style={{
          marginTop: 20,
          fontSize: 26,
          color: "#cbd5e1",
          maxWidth: 1040,
          lineHeight: 1.4,
        }}
      >
        {`${DAY_JOB} ${PITCH}`}
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 22,
          color: "#94a3b8",
          maxWidth: 1040,
          lineHeight: 1.4,
        }}
      >
        {`${CORE_STACK.join(", ")}. ${AVAILABILITY.headline}.`}
      </div>
    </div>,
    { ...size },
  );
}
