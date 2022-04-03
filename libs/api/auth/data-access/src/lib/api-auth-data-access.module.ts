import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiCoreModule } from '@instagrammer/api/core';

@Module({
  imports: [ApiCoreModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiAuthDataAccessModule {}
