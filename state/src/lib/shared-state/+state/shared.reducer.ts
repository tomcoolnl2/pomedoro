import { Action, createReducer, on } from '@ngrx/store';
import { SharedState, initialSharedState } from './shared.state';
import * as SharedActions from './shared.actions';

const reducer = createReducer(
	initialSharedState,
	on(
		SharedActions.setInitialSettings,
		(state, { timerMode, config, schedule, session, remainingTime }) => ({
			...state,
			timerMode,
			config,
			schedule,
			session,
			remainingTime,
		})
	),
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
	on(SharedActions.setTimerMode, (state, { timerMode }) => ({
		...state,
		timerMode,
	})),
	on(SharedActions.setTimerStatus, (state, { timerStatus }) => ({
		...state,
		timerStatus,
	})),
	on(SharedActions.setTimerRemaining, (state, { remainingTime }) => ({
		...state,
		remainingTime,
	})),
	on(SharedActions.loadSchedulesSuccess, (state, { scheduleConfig }) => ({
		...state,
		scheduleConfig,
	})),
	on(SharedActions.throwError, (state, { error }) => ({
		...state,
		error,
	}))
);

export function sharedReducer(state: SharedState, action: Action) {
	return reducer(state, action);
}
