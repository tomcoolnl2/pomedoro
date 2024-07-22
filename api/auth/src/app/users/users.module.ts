import { Module } from '@nestjs/common';
import { DatabaseModule } from '@pomodoro/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UserDocument, UserSchema } from './models/user.schema';

@Module({
	imports: [DatabaseModule, DatabaseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }])],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	exports: [UsersService],
})
export class UsersModule {}
