import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvConfigDto } from './env.dto';

export function validate(config: Record<string, unknown>) {
	//
	const validatedConfig = plainToClass(EnvConfigDto, config, {
		enableImplicitConversion: true,
	});

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(`Validation failed: ${errors.map((err) => JSON.stringify(err.constraints)).join(', ')}`);
	}

	return validatedConfig;
}
