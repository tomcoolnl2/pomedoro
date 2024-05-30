import { createAction, props } from '@ngrx/store';
import {
	ScheduleConfig,
	ScheduleType,
	Session,
	TimerMode,
	TimerStatus,
} from '@ng-pomedoro/model';

export const setScheduleConfig = createAction(
	'[Pomodoro Config] Set Current Configuration',
	props<{ config: ScheduleConfig }>()
);

export const setSchedule = createAction(
	'[Pomodoro Config] Set Current Schedule',
	props<{ schedule: Session[] }>()
);

export const setSession = createAction(
	'[Pomodoro Config] Set Current Session',
	props<{ session: Session }>()
);

export const resetTimer = createAction('[Pomodoro Timer] Reset Timer');

export const setTimerDuration = createAction(
	'[Pomodoro Timer] Set Timer Duration',
	props<{ duration: number }>()
);

export const setTimerMode = createAction(
	'[Pomodoro Timer] Set Timer Mode',
	props<{ timerMode: TimerMode }>()
);

export const setTimerStatus = createAction(
	'[Pomodoro Timer] Set Timer Status',
	props<{ timerStatus: TimerStatus }>()
);

export const setTimerProgress = createAction(
	'[Pomodoro Timer] Set Timer Progress',
	props<{ progress: number }>()
);

export const setTimerRemaining = createAction(
	'[Pomodoro Timer] Set Timer Remaining',
	props<{ remainingTime: number }>()
);

export const loadSchedules = createAction('[Schedules] Load Schedules');

export const loadSchedulesSuccess = createAction(
	'[Schedules] Load Schedules Success',
	props<{ scheduleConfig: Map<ScheduleType, ScheduleConfig> }>()
);

export const loadSchedulesFailure = createAction(
	'[Schedules] Load Schedules Failure',
	props<{ error: any }>() //TODO: Define error type
);
