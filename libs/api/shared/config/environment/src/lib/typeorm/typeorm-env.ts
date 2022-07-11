import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPEORM_INJECTION_TOKEN = Symbol('TYPEORM_TOKEN');

export const TYPEORM_ENV: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'awesome_dev_pass',
  password: 'awesome_dev_pass',
  database: 'instagrammer',
  //  Always keep DB schema up to date
  synchronize: true,
};
