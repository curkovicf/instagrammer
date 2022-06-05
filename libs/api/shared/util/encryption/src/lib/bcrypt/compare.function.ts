import * as bcrypt from 'bcrypt';

export async function compare(nonEncrypted: string, encrypted: string): Promise<boolean> {
  return await bcrypt.compare(nonEncrypted, encrypted);
}
