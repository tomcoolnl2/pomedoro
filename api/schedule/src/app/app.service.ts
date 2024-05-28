import { Injectable } from '@nestjs/common';
import { PomodoroSchedule } from '@ng-pomedoro/model';
import { schedules } from '../assets/db-data';

@Injectable()
export class AppService {
	//
	getSchedules(): { payload: PomodoroSchedule[] } {
		return { payload: schedules };
	}
}
