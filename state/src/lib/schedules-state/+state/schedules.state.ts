import { Course } from '@ng-pomedoro/model';

export interface SchedulesState {
	schedules: Course[];
}

export const initialState: SchedulesState = {
	schedules: [],
};
