import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || '', {
      dbName: 'walla_db',
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    }),
  ],
})
export class DatabaseModule {}
