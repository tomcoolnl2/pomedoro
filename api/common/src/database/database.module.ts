import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				uri: `mongodb://${configService.get<string>(
					'DATABASE_HOST'
				)}:${configService.get<number>('DATABASE_PORT')}/pomodoro`,
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
