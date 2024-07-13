import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule } from '@ng-pomodoro/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationDocumentSchema } from './models/reservation.schema';

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationDocumentSchema }]),
	],
	controllers: [ReservationsController],
	providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
