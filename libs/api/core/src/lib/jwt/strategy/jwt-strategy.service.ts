import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserEntity, UserRepository } from '@instagrammer/api/auth/data-access';
import { JwtPayload } from '@instagrammer/api/shared/data-access/interfaces';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private readonly usersRepository: UserRepository) {
    super({
      //  TODO: Setup env service and import this stuff form env service
      secretOrKey: 'super_secret',
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
