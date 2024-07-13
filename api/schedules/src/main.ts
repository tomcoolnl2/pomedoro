import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SchedulesModule } from './app/schedules.module';

function setupOpenApi(app: INestApplication) {
	//
	const config = new DocumentBuilder().setTitle('API Documentation').setVersion('1.0').addTag('api').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
	//
	const app = await NestFactory.create(SchedulesModule);
	const configService = app.get(ConfigService);
	const globalPrefix = 'api';
	const host = configService.get<string>('SCHEDULES_API_URL');
	const port = configService.get<number>('SCHEDULES_API_PORT');

	app.setGlobalPrefix(globalPrefix);
	app.enableCors();
	setupOpenApi(app);
	await app.listen(port);

	Logger.log(`🚀 Application is running on: ${host}:${port}/${globalPrefix}`);
}

bootstrap();
