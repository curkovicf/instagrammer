import { Injectable } from '@nestjs/common';

import { IEncryptionService } from '../encryption.interface';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BCryptEncryptionService implements IEncryptionService {
  public async hashWithSalt(valueToHash: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(valueToHash, salt);
  }

  public async compare(nonEncrypted: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(nonEncrypted, encrypted);
  }
}
