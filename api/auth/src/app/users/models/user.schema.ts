import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDocument } from '@pomodoro/common';
import user from '../user.data.json';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
	//
	@Prop()
	@ApiProperty({ example: user.email, description: 'User email' })
	public email: string;

	@Prop()
	@ApiProperty({ example: user.password, description: 'User password' })
	public password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
