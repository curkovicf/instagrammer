import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './strategy/jwt-strategy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@instagrammer/api/auth/data-access';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //  TODO: Don't put secret key here, make env file
    JwtModule.register({ secret: 'super_secret', signOptions: { expiresIn: 3600 } }),
  ],
  providers: [JwtStrategyService],
  exports: [JwtStrategyService, PassportModule, JwtModule],
})
export class PassportJwtConfigModule {}
