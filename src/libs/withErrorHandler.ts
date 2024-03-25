import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'

export function withErrorHandler(handler: (request: NextRequest) => Promise<unknown>) {
  return async (request: NextRequest) => {
    try {
      return await handler(request)
    } catch (error) {
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : 'system error'
        },
        { status: 500 }
      )
    }
  }
}
