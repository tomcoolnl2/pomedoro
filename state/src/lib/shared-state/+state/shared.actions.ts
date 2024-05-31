import { createAction, props } from '@ngrx/store';
import {
	ScheduleConfig,
	ScheduleType,
	Session,
	SessionType,
	TimerMode,
	TimerStatus,
} from '@ng-pomedoro/model';

export const noop = createAction('[Noop] fn for testing');

export const setInitialSettings = createAction(
	'[Config] Set Initial Settings',
	props<{
		timerMode: TimerMode;
		config: ScheduleConfig;
		schedule: Session[];
		session: Session;
		remainingTime: number;
	}>()
);

export const setScheduleConfig = createAction(
	'[Config] Set Current Configuration',
	props<{ config: ScheduleConfig }>()
);

export const setSchedule = createAction(
	'[Config] Set Current Schedule',
	props<{ schedule: Session[] }>()
);

export const setSession = createAction(
	'[Config] Set Current Session',
	props<{ session: Session }>()
);

export const setSessionType = createAction(
	'[Config] Set Current Session',
	props<{ sessionType: SessionType }>()
);

export const endSession = createAction('[Timer] End Session');

export const resetTimer = createAction('[Timer] Reset Timer');

export const setTimerDuration = createAction(
	'[Timer] Set Timer Duration',
	props<{ duration: number }>()
);

export const setTimerMode = createAction(
	'[Timer] Set Timer Mode',
	props<{ timerMode: TimerMode }>()
);

export const setTimerStatus = createAction(
	'[Timer] Set Timer Status',
	props<{ timerStatus: TimerStatus }>()
);

export const setTimerRemaining = createAction(
	'[Timer] Set Timer Remaining',
	props<{ remainingTime: number }>()
);

export const loadSchedules = createAction('[Schedules] Load Schedules');

export const loadSchedulesSuccess = createAction(
	'[Schedules] Load Schedules Success',
	props<{ scheduleConfig: Map<ScheduleType, ScheduleConfig> }>()
);

export const throwError = createAction(
	'[Schedules] Load Schedules Failure',
	props<{ error: Error }>()
);
