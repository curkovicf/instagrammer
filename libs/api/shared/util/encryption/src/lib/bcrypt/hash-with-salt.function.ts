import * as bcrypt from 'bcrypt';

export async function hashWithSalt(valueToHash: string): Promise<string> {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(valueToHash, salt);
}
