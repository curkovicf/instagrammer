import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '@instagrammer/api/module/user/data';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/env';
import { UserService } from '@instagrammer/api/module/user/logic';
import { JwtPayload } from '@instagrammer/api/shared/data';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get(EnvironmentVariable.PASSPORT_SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
