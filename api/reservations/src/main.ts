import { Logger } from 'nestjs-pino';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ReservationsModule } from './app/reservations.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupOpenApi(app: INestApplication) {
	//
	const config = new DocumentBuilder().setTitle('Reservations API Documentation').setVersion('1.0').addTag('api').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
	//
	const app = await NestFactory.create(ReservationsModule);
	const configService = app.get(ConfigService);
	const host = configService.get<string>('RESERVATIONS_API_URL');
	const port = configService.get<number>('RESERVATIONS_API_PORT');
	const globalPrefix = 'api';

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.useLogger(app.get(Logger));
	app.setGlobalPrefix(globalPrefix);
	app.enableCors();
	setupOpenApi(app);
	await app.listen(port);

	console.log(`🚀 Reservations API is running on: ${host}:${port}/${globalPrefix}`);
}

bootstrap();
