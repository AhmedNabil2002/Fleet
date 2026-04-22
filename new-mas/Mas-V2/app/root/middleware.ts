import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const lang = request.cookies.get("i18n_lang")?.value ?? "en";
  const supported = ["en", "ar"];
  const safeLang = supported.includes(lang) ? lang : "en";

  const response = NextResponse.next();
  response.headers.set("x-lang", safeLang);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};