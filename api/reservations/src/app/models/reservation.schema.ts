import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDocument } from '@pomodoro/common';
import reservation from '../reservations.data.json';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
	//
	@Prop()
	@ApiProperty({ example: reservation.timestamp, description: 'Timestamp' })
	public timestamp: Date;

	@Prop()
	@ApiProperty({ example: reservation.startDate, description: 'Start date' })
	public startDate: Date;

	@Prop()
	@ApiProperty({ example: reservation.endDate, description: 'End date' })
	public endDate: Date;

	@Prop()
	@ApiProperty({ example: reservation.userId, description: 'User ID' })
	public userId: string;

	@Prop()
	@ApiProperty({ example: reservation.placeId, description: 'Place ID' })
	public placeId: string;

	@Prop()
	@ApiProperty({ example: reservation.invoiceId, description: 'Invoice ID' })
	public invoiceId: string;
}

export const ReservationDocumentSchema = SchemaFactory.createForClass(ReservationDocument);
