import { createAction, props } from '@ngrx/store';
import {
	ScheduleConfig,
	ScheduleType,
	Session,
	TimerMode,
	TimerStatus,
} from '@ng-pomedoro/model';

export const setInitialSettings = createAction(
	'[Config] Set Initial Settings',
	props<{
		timerMode: TimerMode;
		config: ScheduleConfig;
		schedule: Session[];
		session: Session;
		duration: number;
	}>()
);

export const setInitialSettingsFailure = createAction(
	'[Config] Set Initial Settings Failure',
	props<{ error: any }>()
);

export const setScheduleConfigFailure = createAction(
	'[Config] Set Schedule Config Failure'
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

export const setTimerProgress = createAction(
	'[Timer] Set Timer Progress',
	props<{ progress: number }>()
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

export const loadSchedulesFailure = createAction(
	'[Schedules] Load Schedules Failure',
	props<{ error: Error }>()
);
