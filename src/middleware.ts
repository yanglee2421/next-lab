// I18n Imports
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Next Imports
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(
    match(new Negotiator({ headers: Object.fromEntries(request.headers.entries()) }).languages(), locales, 'en-US')
  )

  // Pathname with locale
  if (
    locales.some(locale => {
      if (request.nextUrl.pathname.startsWith(`/${locale}/`)) {
        return true
      }

      if (request.nextUrl.pathname === `/${locale}`) {
        return true
      }

      return false
    })
  ) {
    return
  }

  // Pathname without locale
  request.nextUrl.pathname = `/${match(new Negotiator({ headers: Object.fromEntries(request.headers.entries()) }).languages(), locales, fallbackLocale)}/${request.nextUrl.pathname}`
  return NextResponse.redirect(request.nextUrl)
}

const locales = ['zh-CN', 'zh-TW', 'en-US']
const fallbackLocale = 'en-US'

// Matcher Config
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - all items inside the public folder
     *    - images (public images)
     *    - next.svg (Next.js logo)
     *    - vercel.svg (Vercel logo)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.+?/hook-examples|.+?/menu-examples|images|next.svg|vercel.svg).*)'
  ]
}
