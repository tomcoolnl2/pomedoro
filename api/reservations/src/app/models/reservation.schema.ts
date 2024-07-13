import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@ng-pomodoro/common';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
	//
	@Prop()
	public timestamp: Date;

	@Prop()
	public startDate: Date;

	@Prop()
	public endDate: Date;

	@Prop()
	public userId: string;

	@Prop()
	public placeId: string;

	@Prop()
	public invoiceId: string;
}

export const ReservationDocumentSchema = SchemaFactory.createForClass(ReservationDocument);
