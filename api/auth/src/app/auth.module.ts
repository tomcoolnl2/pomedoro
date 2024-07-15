import { Module } from '@nestjs/common';
import { ConfigModule, LoggerModule } from '@ng-pomodoro/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';

@Module({
	imports: [ConfigModule, LoggerModule, UsersModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
