import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Esneider Bravo — Senior Backend Engineer · Python · FastAPI · AWS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tagStyle = {
  background: "rgba(129,236,255,0.06)",
  border: "1px solid rgba(129,236,255,0.22)",
  borderRadius: "6px",
  padding: "6px 16px",
  color: "#81ecff",
  fontSize: "14px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0e0e0e 0%, #161616 60%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Left cyan accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "6px",
            height: "100%",
            background: "linear-gradient(180deg, #81ecff 0%, #00e5ff 100%)",
          }}
        />

        {/* Status pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(38,38,38,0.9)",
            border: "1px solid rgba(72,72,71,0.35)",
            borderRadius: "9999px",
            padding: "7px 18px",
            marginBottom: "36px",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#69f6b8" }} />
          <span style={{ color: "#69f6b8", fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
            Available for new projects
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "82px",
            fontWeight: 700,
            letterSpacing: "-3px",
            lineHeight: "0.88",
            marginBottom: "28px",
          }}
        >
          ESNEIDER
          <br />
          <span style={{ color: "rgba(173,170,170,0.32)" }}>BRAVO</span>
        </div>

        {/* Role */}
        <div
          style={{
            color: "#81ecff",
            fontSize: "24px",
            fontWeight: 400,
            marginBottom: "28px",
            letterSpacing: "0.01em",
          }}
        >
          Senior Backend Engineer · Python · FastAPI · AWS
        </div>

        {/* Chips */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={tagStyle}>Microservices</div>
          <div style={tagStyle}>AI-First</div>
          <div style={tagStyle}>Fintech</div>
          <div style={tagStyle}>8+ Years</div>
          <div style={tagStyle}>Remote</div>
        </div>

        {/* Domain bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "42px",
            right: "90px",
            color: "#3a3a3a",
            fontSize: "17px",
            letterSpacing: "2px",
          }}
        >
          esneiderbravo.dev
        </div>
      </div>
    ),
    { ...size }
  );
}

