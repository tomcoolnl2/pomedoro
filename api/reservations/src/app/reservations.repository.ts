import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from '@ng-pomodoro/common';
import { ReservationDocument, ReservationDocumentSchema } from './models/reservation.schema';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
	//
	protected readonly logger = new Logger(ReservationsRepository.name);

	constructor(@InjectModel(ReservationDocument.name) private readonly reservationModel: Model<ReservationDocument>) {
		super(reservationModel);
	}
}
