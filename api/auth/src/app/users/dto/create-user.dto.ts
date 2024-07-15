import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
	//
	@ApiProperty({ example: 'john@doe.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'Test123!' })
	@IsStrongPassword()
	password: string;
}
