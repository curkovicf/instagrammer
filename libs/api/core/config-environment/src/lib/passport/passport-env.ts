import { IAuthModuleOptions } from '@nestjs/passport/dist/interfaces/auth-module.options';

export const PASSPORT_INJECTION_TOKEN = Symbol('PASSPORT_TOKEN');

export const PASSPORT_ENV: IAuthModuleOptions = {
  secret: 'SUPER_SECRET',
  strategy: 'jwt',
  defaultStrategy: 'jwt',
};
