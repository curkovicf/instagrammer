import * as Joi from 'joi';

export const envFileValidationSchema = Joi.object({
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_DB_NAME: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
  PASSPORT_SECRET: Joi.string().required(),
  PASSPORT_TOKEN_EXPIRES: Joi.number().required(),
  PASSPORT_STRATEGY: Joi.string().required(),
  PASSPORT_DEFAULT_STRATEGY: Joi.string().required(),
  AUTH_ACCESS_TOKEN_EXPIRES_STRING: Joi.string().required(),
  AUTH_ACCESS_TOKEN_EXPIRES_NUMBER: Joi.number().required(),
  AUTH_REFRESH_TOKEN_SHORT_EXPIRES_STRING: Joi.string().required(),
  AUTH_REFRESH_TOKEN_SHORT_EXPIRES_NUMBER: Joi.number().required(),
  AUTH_REFRESH_TOKEN_LONG_EXPIRES_STRING: Joi.string().required(),
  AUTH_REFRESH_TOKEN_LONG_EXPIRES_NUMBER: Joi.number().required(),
});
