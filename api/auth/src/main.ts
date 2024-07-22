import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './app/auth.module';

function setupOpenApi(app: INestApplication) {
	//
	const config = new DocumentBuilder().setTitle('Auth API Documentation').setVersion('1.0').addBearerAuth().build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
	//
	const app = await NestFactory.create(AuthModule);
	const configService = app.get(ConfigService);
	const host = configService.get<string>('AUTH_API_URL');
	const port = configService.get<number>('AUTH_API_PORT');
	const globalPrefix = 'api';

	app.connectMicroservice({
		transports: Transport.TCP,
		options: { host: configService.get<string>('AUTH_TCP_HOST'), port: configService.get<string>('AUTH_TCP_PORT') },
	});
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.useLogger(app.get(Logger));
	app.useLogger(app.get(Logger));
	app.setGlobalPrefix(globalPrefix);
	app.enableCors();
	setupOpenApi(app);
	await app.startAllMicroservices();
	await app.listen(port);
	console.log(`🚀 Reservations API is running on: ${host}:${port}/${globalPrefix}`);
}

bootstrap();
