import { Module } from '@nestjs/common';
import { BcryptEncryptionService } from './bcrypt/bcrypt-encryption.service';
import { BaseEncryptionService } from './encryption.class';

@Module({
  providers: [
    {
      provide: BaseEncryptionService,
      useClass: BcryptEncryptionService,
    },
  ],
  exports: [BaseEncryptionService],
})
export class EncryptionModule {}
