import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai_Looped({
  weight: ['400', '500', '600', '700'],
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai", "latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ธุรกิจของคุณพร้อม AI แล้วหรือยัง? | AI Transformation Assessment",
  description: "ประเมินความพร้อมธุรกิจสู่ยุค AI ด้วยแบบทดสอบ 50 คำถาม วิเคราะห์ศักยภาพและโอกาสในการนำ AI มาขับเคลื่อนธุรกิจของคุณ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${ibmPlexSansThai.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
