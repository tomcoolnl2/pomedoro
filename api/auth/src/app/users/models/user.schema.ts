import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@ng-pomodoro/common';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
	//
	@Prop()
	public email: string;

	@Prop()
	public password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
