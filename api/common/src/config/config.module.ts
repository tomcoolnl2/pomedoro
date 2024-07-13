import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validate } from './env.validator';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			validate,
		}),
	],
})
export class ConfigModule {}
