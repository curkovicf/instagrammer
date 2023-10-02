import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserEntity, UserRepository } from '@instagrammer/api/module/user/data';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/env';
import { JwtPayload } from '@instagrammer/api/shared/data';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PassportJwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
