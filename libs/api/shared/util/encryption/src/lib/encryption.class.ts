export abstract class BaseEncryptionService {
  /**
   * Compares the encrypted string against non-encrypted string
   * @param nonEncrypted is non-encrypted string
   * @param encrypted is encrypted string
   */
  public abstract compare(nonEncrypted: string | Buffer, encrypted: string): Promise<boolean>;

  /**
   * Encrypts the passed data and then returns it to the caller
   * @param valueToHash is value to be hashed
   * @param saltRounds is saltOrRounds to add to encryption method
   */
  public abstract hash(valueToHash: string, saltRounds?: number): Promise<string>;
}
