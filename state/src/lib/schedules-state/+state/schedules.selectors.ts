import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SchedulesState } from './schedules.state';

const getSchedulesState = createFeatureSelector<SchedulesState>('schedules');

export const getSchedules = createSelector(
	getSchedulesState,
	(state: SchedulesState) => state.schedules
);
