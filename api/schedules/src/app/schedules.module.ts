import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule } from '@pomodoro/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
	imports: [ConfigModule, DatabaseModule],
	controllers: [SchedulesController],
	providers: [SchedulesService],
})
export class SchedulesModule {}
