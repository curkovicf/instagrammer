import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategyService } from './jwt/jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //  TODO: Don't put secret key here, make env file
    JwtModule.register({ secret: 'super_secret', signOptions: { expiresIn: 3600 } }),
  ],
  providers: [AuthService, JwtStrategyService],
  exports: [AuthService, JwtStrategyService, PassportModule],
})
export class ApiAuthDataAccessModule {}
