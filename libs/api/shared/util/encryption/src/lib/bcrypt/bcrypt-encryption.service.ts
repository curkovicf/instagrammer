import { Injectable } from '@nestjs/common';
import { BaseEncryptionService } from '../encryption.class';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class BcryptEncryptionService extends BaseEncryptionService {
  public async compare(nonEncrypted: string, encrypted: string): Promise<boolean> {
    return await compare(nonEncrypted, encrypted);
  }

  public async hash(valueToHash: string, saltRounds: number = 10): Promise<string> {
    const salt = await genSalt(saltRounds);

    return await hash(valueToHash, salt);
  }
}
