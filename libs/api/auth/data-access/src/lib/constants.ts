export enum JwtExpiresStr {
  ACCESS_JWT = '5m',
  REFRESH_JWT_EXPIRES_SHORT = '2 days',
  REFRESH_JWT_EXPIRES_LONG = '60 days',
}

export function getJwtExpiryInMilliseconds(jwtExpiresStr: JwtExpiresStr): number {
  switch (jwtExpiresStr) {
    case JwtExpiresStr.ACCESS_JWT:
      return 300 * 1000;
    case JwtExpiresStr.REFRESH_JWT_EXPIRES_SHORT:
      return 172800 * 1000;
    case JwtExpiresStr.REFRESH_JWT_EXPIRES_LONG:
      return 5184000 * 1000;
  }
}
