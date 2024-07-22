import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from '@pomodoro/common';
import { ReservationDocument } from './models/reservation.schema';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
	//
	protected readonly logger = new Logger(ReservationsRepository.name);

	constructor(@InjectModel(ReservationDocument.name) private readonly reservationModel: Model<ReservationDocument>) {
		super(reservationModel);
	}
}
