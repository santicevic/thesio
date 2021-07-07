import * as crypto from 'crypto';

export const generateHash = (data: string): string => {
  return crypto
    .createHmac('sha256', process.env.JWT_SALT)
    .update(data)
    .digest('hex');
};

export const validateHash = (data: string, hashed: string): boolean => {
  return generateHash(data) === hashed;
};
