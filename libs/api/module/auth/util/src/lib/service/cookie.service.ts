import { Injectable } from '@nestjs/common';

export interface CookieOptions {
  title: string;
  token: string;
  expiresInMillis: number;
}

@Injectable()
export class CookieService {
  /**
   * Creates new HTTP header cookie
   *
   * @param cookieOptions
   */
  public createCookie(cookieOptions: CookieOptions): string {
    const { title, token, expiresInMillis } = cookieOptions;

    return `${title}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
      new Date().getTime() + expiresInMillis
    }`;
  }
}
