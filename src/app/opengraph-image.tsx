import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0073bc 0%, #004e7f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: 32,
            background: "rgba(255,255,255,0.15)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 80,
            fontWeight: 900,
            marginBottom: 32,
          }}
        >
          P
        </div>
        <div style={{ fontSize: 56, fontWeight: 900 }}>Pomax Shiraz</div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.85 }}>
          Official Pomax Dealer in Shiraz, Iran
        </div>
      </div>
    ),
    { ...size }
  );
}
