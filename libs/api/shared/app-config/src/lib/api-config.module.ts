import { Module } from '@nestjs/common';
import { TypeormConfigModule } from './typeorm/typeorm.module';

@Module({
  imports: [TypeormConfigModule],
})
export class ApiConfigModule {}
