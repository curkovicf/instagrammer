import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthModuleOptions, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user.repository';
import { PASSPORT_INJECTION_TOKEN } from '@instagrammer/api/core/config-environment';
import { JwtPayload } from '../jwt-payload.interface';
import { UserEntity } from '@instagrammer/api/core/data-access';

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
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
