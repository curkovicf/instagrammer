import { Global, Module } from '@nestjs/common';
import { BCryptEncryptionService } from './bcrypt/bcrypt-encryption.service';

@Global()
@Module({
  imports: [BCryptEncryptionService],
  exports: [BCryptEncryptionService],
})
export class EncryptionModule {}
