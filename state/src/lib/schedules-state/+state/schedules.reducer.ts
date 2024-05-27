import { Action, createReducer, on } from '@ngrx/store';
import { SchedulesState, initialState } from './schedules.state';
import * as TicketsActions from './schedules.actions';

const reducer = createReducer(
	initialState,
	on(TicketsActions.loadSchedulesSuccess, (state, { schedules }) => ({
		...state,
		schedules,
	}))
	// Add other actions here
);

export function schedulesReducer(state: SchedulesState, action: Action) {
	return reducer(state, action);
}
