import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserEntity, UserRepository } from '@instagrammer/api/module/user/data';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/environment';
import { JwtPayload } from '@instagrammer/api/shared/data';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '@instagrammer/api/module/auth/data';
import { CookieService } from '@instagrammer/api/module/auth/util';

@Injectable()
export class PassportJwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository,
    private readonly configService: ConfigService,
    private readonly cookieService: CookieService,
  ) {
    super({
      secretOrKey: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      jwtFromRequest: ExtractJwt.fromExtractors([
        request => {
          return request.cookies[this.cookieService.ACCESS_TOKEN_KEY];
        },
      ]),
    });
  }

  public async validate(payload: JwtPayload): Promise<null> {
    const { username } = payload;

    const account = await this.accountRepository.findOne({ where: { username } });

    if (!account) {
      throw new UnauthorizedException();
    }

    return null;
  }
}
