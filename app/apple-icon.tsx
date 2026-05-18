import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)",
        color: "#7dd3fc",
        fontSize: 72,
        fontWeight: 700,
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      SB
    </div>,
    { ...size },
  );
}
