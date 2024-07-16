import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import user from '../user.data.json';

export class CreateUserDto {
	//
	@ApiProperty({ example: user.email, description: 'User email' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: user.password, description: 'User password' })
	@IsStrongPassword()
	password: string;
}
