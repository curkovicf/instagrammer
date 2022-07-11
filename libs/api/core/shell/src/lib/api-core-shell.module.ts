import { Global, Module } from '@nestjs/common';
import { ConfigJwtModule } from '@instagrammer/api/core/config-jwt';
import { ConfigDatabaseModule } from '@instagrammer/api-core-config-database';

@Global()
@Module({
  imports: [ConfigDatabaseModule, ConfigJwtModule],
})
export class ApiCoreShellModule {}
