import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import reservation from '../reservations.data.json';

export class CreateReservationDto {
	//
	@IsDate()
	@Type(() => Date)
	@ApiProperty({ example: reservation.startDate, description: 'Start date' })
	public startDate: Date;

	@IsDate()
	@Type(() => Date)
	@ApiProperty({ example: reservation.endDate, description: 'End date' })
	public endDate: Date;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: reservation.invoiceId, description: 'Invoice ID' })
	public invoiceId: string;
}
