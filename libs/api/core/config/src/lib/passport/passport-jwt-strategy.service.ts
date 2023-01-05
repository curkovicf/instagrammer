import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@instagrammer/api/auth/data-access';
import { JwtPayload } from '../../../../../auth/data-access/src/lib/jwt/jwt-payload.interface';
import { UserEntity } from '@instagrammer/api/core/data-access';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '../env/environment-variable.enum';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private readonly usersRepository: UserRepository,
    // @Inject(PASSPORT_INJECTION_TOKEN) passportEnvironment: IAuthModuleOptions,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get(EnvironmentVariable.PASSPORT_SECRET),
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
