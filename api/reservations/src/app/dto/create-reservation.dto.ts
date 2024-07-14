import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
	//
	@ApiProperty({ example: '2021-01-01' })
	@IsDate()
	@Type(() => Date)
	public startDate: Date;

	@ApiProperty({ example: '2021-01-02' })
	@IsDate()
	@Type(() => Date)
	public endDate: Date;

	@ApiProperty({ example: '1' })
	@IsString()
	@IsNotEmpty()
	public invoiceId: string;
}
