import { Global, Module } from '@nestjs/common';
import { ConfigDatabaseModule } from '@instagrammer/api-core-config-database';

@Global()
@Module({
  imports: [ConfigDatabaseModule],
})
export class ApiCoreShellModule {}
