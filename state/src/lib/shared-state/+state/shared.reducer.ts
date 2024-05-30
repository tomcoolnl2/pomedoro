import { Action, createReducer, on } from '@ngrx/store';
import { SharedState, initialSharedState } from './shared.state';
import * as SharedActions from './shared.actions';

const reducer = createReducer(
	initialSharedState,
	on(SharedActions.setScheduleConfig, (state, { config }) => ({
		...state,
		config,
	})),
	on(SharedActions.setSchedule, (state, { schedule }) => ({
		...state,
		schedule,
	})),
	on(SharedActions.setSession, (state, { session }) => ({
		...state,
		session,
	})),
	on(SharedActions.resetTimer, () => ({
		// TODO: -> reset
		...initialSharedState,
	})),
	on(SharedActions.setTimerDuration, (state, { duration }) => ({
		...state,
		duration,
	})),
	on(SharedActions.setTimerMode, (state, { timerMode }) => ({
		...state,
		timerMode,
	})),
	on(SharedActions.setTimerStatus, (state, { timerStatus }) => ({
		...state,
		timerStatus,
	})),
	on(SharedActions.setTimerProgress, (state, { progress }) => ({
		...state,
		progress,
	})),
	on(SharedActions.setTimerRemaining, (state, { remainingTime }) => ({
		...state,
		remainingTime,
	})),
	on(SharedActions.loadSchedulesSuccess, (state, { scheduleConfig }) => ({
		...state,
		scheduleConfig,
	}))
);

export function sharedReducer(state: SharedState, action: Action) {
	return reducer(state, action);
}
