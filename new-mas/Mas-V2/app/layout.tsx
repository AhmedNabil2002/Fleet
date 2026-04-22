import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";           // ← add this
import "./globals.css";
import "devextreme/dist/css/dx.light.css";
import AuthLayout from "./components/UI/Authlayout";
import I18nProvider from "./components/providers/I18nProvider";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "ERP System",
  description: "Enterprise Resource Planning System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const lang = headersList.get("x-lang") ?? "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-tajawal)]">
        {/* Apply saved theme before first paint to avoid flash */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <I18nProvider>
          <AuthLayout>{children}</AuthLayout>
        </I18nProvider>
      </body>
    </html>
  );
}