import { NextRequest, NextResponse } from 'next/server'
import { validateAuthorization } from '@/utils/validateAuthorization'
import { createJwt } from '@/utils/createJwt'

export async function GET(request: NextRequest) {
  try {
    const { user, error } = await validateAuthorization(request)

    if (error) {
      return error
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      phone: user.phone
    }

    const token = createJwt(userInfo)

    return NextResponse.json({
      user: userInfo,
      token
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'system error'
      },
      { status: 500 }
    )
  }
}
