import { IsString, IsNumber } from 'class-validator';

export class EnvConfigDto {
	@IsString()
	DATABASE_HOST!: string;

	@IsNumber()
	DATABASE_PORT!: number;
}
