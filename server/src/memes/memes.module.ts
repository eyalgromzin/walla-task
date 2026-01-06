import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Meme, MemeSchema } from './meme.schema';
import { MemesService } from './memes.service';
import { MemesController } from './memes.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }])],
  controllers: [MemesController],
  providers: [MemesService],
  exports: [MemesService],
})
export class MemesModule {}
