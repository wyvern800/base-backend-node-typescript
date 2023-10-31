import crypto from 'crypto';

/**
 *  Hashes a password with crypto
 *
 * @param { string } password The plain password
 * @returns { string } Hashed password
 */
export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  return `${hash}.${salt}`;
};

/**
 * Verify if the password is correct
 * @param { string } password The plain password
 * @param { string } hashedPassword The hashed password to compare
 * @returns { boolean} Returns true if the password matches
 */
export const verifyPassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  const [hash, salt] = hashedPassword.split('.');
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  return hash === verifyHash;
};
