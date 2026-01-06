import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../config';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URI ?? 'mongodb://localhost:27017', {
      dbName: 'walla_db',
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  private logger = new Logger(DatabaseModule.name);

  onModuleInit() {
    this.logger.log('MongoDB connection established successfully');
  }
}
