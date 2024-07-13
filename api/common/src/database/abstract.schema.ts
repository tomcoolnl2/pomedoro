import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class AbstractDocument extends Document {
	//
	@Prop({ type: Types.ObjectId })
	override _id?: Types.ObjectId;
}

export const AbstractDocumentSchema = SchemaFactory.createForClass(AbstractDocument);
