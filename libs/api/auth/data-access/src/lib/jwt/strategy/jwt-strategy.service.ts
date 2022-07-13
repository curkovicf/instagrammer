import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthModuleOptions, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from '@instagrammer/api/auth/data-access';
import { PASSPORT_INJECTION_TOKEN } from '@instagrammer/api/core/config-environment';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private readonly usersRepository: UserRepository,
    @Inject(PASSPORT_INJECTION_TOKEN) passportEnvironment: IAuthModuleOptions,
  ) {
    super({
      secretOrKey: passportEnvironment['secret'],
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;
    const user = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
