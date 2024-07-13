import { IsString, IsNumber } from 'class-validator';

export class EnvConfigDto {
	//
	@IsString()
	DATABASE_HOST!: string;

	@IsNumber()
	DATABASE_PORT!: number;

	@IsString()
	SCHEDULES_API_URL!: string;

	@IsNumber()
	SCHEDULES_API_PORT!: number;

	@IsString()
	RESERVATIONS_API_URL!: string;

	@IsNumber()
	RESERVATIONS_API_PORT!: number;
}
