import { createAction, props } from '@ngrx/store';
import { PomodoroSchedule, TimerMode, TimerStatus } from '@ng-pomedoro/model';

export const resetTimer = createAction('[Pomodoro Timer] Reset Timer');

export const setTimer = createAction(
	'[Pomodoro Timer] Set Timer',
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
	props<{ remaining: number }>()
);

export const loadSchedules = createAction('[Schedules] Load Schedules');

export const loadSchedulesSuccess = createAction(
	'[Schedules] Load Schedules Success',
	props<{ schedules: PomodoroSchedule[] }>()
);
export const loadSchedulesFailure = createAction(
	'[Schedules] Load Schedules Failure',
	props<{ error: any }>() //TODO: Define error type
);
