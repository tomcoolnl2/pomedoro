import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
	//
	@IsDate()
	@Type(() => Date)
	public startDate: Date;

	@IsDate()
	@Type(() => Date)
	public endDate: Date;

	@IsString()
	@IsNotEmpty()
	public invoiceId: string;
}
