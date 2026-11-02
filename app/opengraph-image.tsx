import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "FLYGO Bookings: flights, hotels, apartments and private jets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Shared link preview: brand dots, the promise, and what we sell. */
export default async function OpengraphImage() {
  const logo = `data:image/svg+xml;base64,${(await readFile(join(process.cwd(), "public/images/logo.svg"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logo} alt="" width={189} height={84} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, color: "#1e293b", letterSpacing: -3, lineHeight: 1.02 }}>
            Fly, stay and go,
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, color: "#f58634", letterSpacing: -3, lineHeight: 1.02 }}>your way.</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["Flights", "Hotels", "Apartments", "Private jets"].map((label) => (
            <div
              key={label}
              style={{ display: "flex", padding: "14px 26px", borderRadius: 999, background: "#fff3e6", color: "#c25e16", fontSize: 30, fontWeight: 600 }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
