import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envFileValidationSchema } from './env-validation.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env['STAGE']}`,
      isGlobal: true,
      validationSchema: envFileValidationSchema,
    }),
  ],
})
export class EnvironmentModule {}
