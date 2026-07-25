import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Kinstel Solutions - Web Design, Development & Digital Marketing";

export default async function Image() {
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
          backgroundColor: "#102A43",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 45%), radial-gradient(circle at 80% 80%, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0) 50%)",
          padding: "80px",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "96px",
            height: "96px",
            borderRadius: "24px",
            border: "3px solid #D4AF37",
            marginBottom: "40px",
          }}>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#D4AF37",
              fontFamily: "sans-serif",
            }}>
            K
          </span>
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "sans-serif",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}>
          Kinstel Solutions
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "32px",
            fontWeight: 500,
            color: "#D4AF37",
            fontFamily: "sans-serif",
            textAlign: "center",
          }}>
          Web Design, Development &amp; Digital Marketing
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
