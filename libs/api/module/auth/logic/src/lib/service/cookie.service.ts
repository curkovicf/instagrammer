import { Injectable } from '@nestjs/common';
import { JwtExpires } from '../../../../../user/logic/src/lib/interface/jwt-expires.enum';

@Injectable()
export class CookieService {
  /**
   * Sets new auth cookie header
   * @param refreshJwt
   */
  public createNewHttpHeaderWithCookie(refreshJwt: string): string {
    return `Authentication=${refreshJwt}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
      new Date().getTime() +
      this.jwtUtilService.getJwtExpiryInMilliseconds(JwtExpires.REFRESH_JWT_EXPIRES_LONG)
    }`;
  }
}
