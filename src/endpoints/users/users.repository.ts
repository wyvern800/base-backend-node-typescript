import { DeepPartial } from 'typeorm';
import AppDataSource from '../../data-source';
import User from '../../models/User';
import { hashPassword } from '../../utils/encryption';

const userRepository = AppDataSource.getRepository(User);

/**
 * Gets the user by id
 *
 * @param { number } id The username
 * @returns { Promise<User> } The user object if existant
 */
export const getUserById = async (id: number): Promise<User | null> => {
  return userRepository.findOne({
    where: { id },
  });
};

/**
 * Gets the user by username
 *
 * @param { string } username The username
 * @returns { Promise<User> } The user object if existant
 */
export const getUserByUsername = async (
  username: string,
): Promise<User | null> => {
  return userRepository.findOne({
    where: { username },
  });
};

/**
 * Inserts the user
 *
 * @param { DeepPartial<User> } user User
 * @returns { Promise<User> } The created user
 */
export const insert = async (user: DeepPartial<User>): Promise<User> => {
  const parsedUser = {
    ...user,
    password: hashPassword(user.password as string),
  };
  return userRepository.save(parsedUser);
};
