import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoggerModule, ConfigModule } from '@pomodoro/common';
import { UsersModule } from './users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
	imports: [
		LoggerModule,
		ConfigModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: `${configService.get<number>('JWT_EXPIRATION')}s` },
			}),
			inject: [ConfigService],
		}),
		UsersModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		{
			provide: 'AUTH_INJECTION_TOKEN',
			useValue: 'auth',
		},
	],
	exports: ['AUTH_INJECTION_TOKEN'],
})
export class AuthModule {}
