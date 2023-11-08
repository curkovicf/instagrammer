import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserEntity, UserRepository } from '@instagrammer/api/module/user/data';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/env';
import { JwtPayload } from '@instagrammer/api/shared/data';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@instagrammer/api/module/user/data';
import { AccountRepository } from '@instagrammer/api/module/auth/data';

@Injectable()
export class PassportJwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;

    const account = await this.accountRepository.findOne({ where: { username }, relations: { user: true } });

    if (!account) {
      throw new UnauthorizedException();
    }

    return account.user;
  }
}
