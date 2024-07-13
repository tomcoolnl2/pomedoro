import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument } from './models/reservation.schema';

@Injectable()
export class ReservationsService {
	//
	constructor(private readonly reservationsRepository: ReservationsRepository) {}

	public create(createReservationDto: CreateReservationDto) {
		return this.reservationsRepository.create({
			...createReservationDto,
			timestamp: new Date(),
			userId: '123',
		} as ReservationDocument);
	}

	public findAll() {
		return this.reservationsRepository.find({});
	}

	public findOne(_id: string) {
		return this.reservationsRepository.findOne({ _id });
	}

	public update(_id: string, updateReservationDto: UpdateReservationDto) {
		return this.reservationsRepository.findOneAndUpdate(
			{ _id },
			{
				$set: updateReservationDto,
			}
		);
	}

	public remove(_id: string) {
		return this.reservationsRepository.findOneAndDelete({ _id });
	}
}
