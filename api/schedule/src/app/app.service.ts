import { Injectable } from '@nestjs/common';
import scheduleConfig from '../assets/db-data';

@Injectable()
export class AppService {
	//
	getSchedules(): { payload: string } {
		return { payload: scheduleConfig };
	}
}
