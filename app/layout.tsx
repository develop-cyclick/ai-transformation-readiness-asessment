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
  title: "ประเมินโอกาสธุรกิจด้วย AI | AI Use Case Development",
  description: "พัฒนา Use Case สำหรับการนำ AI มาใช้ในองค์กรของคุณ ด้วยแบบฟอร์ม 25 คำถาม วิเคราะห์ปัญหาและสร้างแนวทางการแก้ไขด้วย AI",
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
