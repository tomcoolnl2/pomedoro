import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule, LoggerModule } from '@pomodoro/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationDocumentSchema } from './models/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationDocumentSchema }]),
		LoggerModule,
		ClientsModule.registerAsync([
			{
				name: 'AUTH_INJECTION_TOKEN',
				// name: 'auth',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.TCP,
					options: {
						host: configService.get<string>('AUTH_TCP_HOST'),
						port: configService.get<number>('AUTH_TCP_PORT'),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [ReservationsController],
	providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
