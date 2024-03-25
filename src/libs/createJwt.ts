import { sign } from 'jsonwebtoken'

export function createJwt(params: Params) {
  return sign(params, process.env.NEXTAUTH_SECRET || '', {
    algorithm: 'HS256',
    expiresIn: 1000 * 60 * 60 * 24 * 15
  })
}

type Params = Parameters<typeof sign>[0]
