import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export const JWT_OPTIONS_INJECTION_TOKEN = Symbol('JWT_OPTIONS_TOKEN');

export const JWT_OPTIONS_ENV: JwtModuleOptions = {
  secret: 'SUPER_SECRET',
  signOptions: {
    expiresIn: 3600,
  },
};
