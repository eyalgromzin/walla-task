import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MemesModule } from './memes/memes.module';

@Module({
  imports: [DatabaseModule, MemesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
