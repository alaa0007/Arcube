import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    UrlsModule
  ],
})

export class AppModule {}
