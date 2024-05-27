import { Course } from '@ng-pomedoro/model';
import { createAction, props } from '@ngrx/store';

export const loadSchedules = createAction('[Schedules] Load Schedules');

export const loadSchedulesSuccess = createAction(
	'[Schedules] Load Schedules Success',
	props<{ schedules: Course[] }>()
);
export const loadSchedulesFailure = createAction(
	'[Schedules] Load Schedules Failure',
	props<{ error: any }>() //TODO: Define error type
);
