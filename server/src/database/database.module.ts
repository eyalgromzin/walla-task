import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: 'walla_db',
        serverApi: { version: '1', strict: true, deprecationErrors: true },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  private logger = new Logger(DatabaseModule.name);

  onModuleInit() {
    this.logger.log('MongoDB connection established successfully');
  }
}
