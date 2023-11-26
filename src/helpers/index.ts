import * as bcrypt from 'bcrypt';

/**
 * RegEx to match a valid password
 * @var string
 */
export const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

/**
 * Encrypt a password using bcrypt module
 * @see https://www.npmjs.com/package/bcrypt
 * @param rawPassword incoming raw password
 * @returns Promise<string>
 */
export const encodePassword = async (rawPassword: string): Promise<string> =>
  await bcrypt.hash(rawPassword, 10);

/**
 * Evaluate if the password matches the hash
 * @see https://www.npmjs.com/package/bcrypt
 * @param rawPassword incoming raw password
 * @param hash database saved hash
 * @returns Promise<boolean>
 */
export const matchPassword = async (
  rawPassword: string,
  hash: string,
): Promise<boolean> => await bcrypt.compare(rawPassword, hash);
