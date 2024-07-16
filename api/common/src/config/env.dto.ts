import { IsString, IsNumber } from 'class-validator';

export class EnvConfigDto {
	//
	@IsString()
	JWT_SECRET!: string;

	@IsNumber()
	JWT_EXPIRATION!: number;

	@IsString()
	POMODORO_APP_URL!: string;

	@IsNumber()
	POMODORO_APP_PORT!: number;

	@IsString()
	SCHEDULES_API_URL!: string;

	@IsNumber()
	SCHEDULES_API_PORT!: number;

	@IsString()
	RESERVATIONS_API_URL!: string;

	@IsNumber()
	RESERVATIONS_API_PORT!: number;

	@IsString()
	AUTH_API_URL!: string;

	@IsNumber()
	AUTH_API_PORT!: number;

	@IsString()
	DATABASE_HOST!: string;

	@IsNumber()
	DATABASE_PORT!: number;
}
