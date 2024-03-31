import { Injectable } from '@nestjs/common';
import { Course } from '@ng-pomedoro/model';
import { COURSES } from '../assets/db-data';

@Injectable()
export class AppService {
	//
	getCourses(): { payload: Course[] } {
		return { payload: Object.values(COURSES) };
	}
}
