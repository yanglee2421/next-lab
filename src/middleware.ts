import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

export function middleware(request: NextRequest) {
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
    return NextResponse.next()
  }

  request.nextUrl.pathname = `/${match(new Negotiator({ headers: Object.fromEntries(request.headers.entries()) }).languages(locales), locales, fallbackLocale)}/${request.nextUrl.pathname}`

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
    '/((?!api|_next/static|_next/image|favicon.ico|.+?/hook-examples|.+?/menu-examples|images|tinymce|next.svg|vercel.svg).*)'
  ]
}
