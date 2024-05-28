import { Action, createReducer, on } from '@ngrx/store';
import { SharedState, initialState } from './shared.state';
import * as SharedActions from './shared.actions';

const reducer = createReducer(
	initialState,
	on(SharedActions.resetTimer, () => ({
		...initialState,
	})),
	on(SharedActions.setTimerDuration, (state, { duration }) => ({
		...state,
		duration,
	})),
	on(SharedActions.setTimerMode, (state, { timerMode }) => ({
		...state,
		currentTimerMode: timerMode,
	})),
	on(SharedActions.setTimerStatus, (state, { timerStatus }) => ({
		...state,
		timerStatus,
	})),
	on(SharedActions.setTimerProgress, (state, { progress }) => ({
		...state,
		progress,
	})),
	on(SharedActions.setTimerRemaining, (state, { remaining }) => ({
		...state,
		remainingTime: remaining,
	})),
	on(SharedActions.loadSchedulesSuccess, (state, { schedules }) => ({
		...state,
		schedules,
	}))
);

export function sharedReducer(state: SharedState, action: Action) {
	return reducer(state, action);
}
