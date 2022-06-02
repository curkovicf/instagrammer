export interface IEncryptionService {
  hashWithSalt(valueToHash: string): Promise<string>;
  compare(nonEncrypted: string, encrypted: string): Promise<boolean>;
}
