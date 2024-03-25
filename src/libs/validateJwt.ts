import { verify } from 'jsonwebtoken'

export function validateJwt(jwt: string) {
  return verify(jwt, process.env.NEXTAUTH_SECRET || '', {
    algorithms: ['HS256']
  })
}
