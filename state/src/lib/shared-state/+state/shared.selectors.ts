import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState, sharedStateId } from './shared.state';

/**
 * Selects the feature state from the NgRx store.
 * @returns { SharedState } The shared state.
 */

const selectSharedState = createFeatureSelector<SharedState>(sharedStateId);

/**
 * Selects the current timer mode from the shared state.
 * @returns { TimerMode } The current timer mode.
 */
export const selectTimerDuration = createSelector(
	selectSharedState,
	(state: SharedState) => state.duration
);

/**
 * Selects the current timer mode from the shared state.
 * @returns { TimerMode } The current timer mode.
 */
export const selectTimerMode = createSelector(
	selectSharedState,
	(state: SharedState) => state.timerMode
);

/**
 * Selects the timer status from the shared state.
 * @returns { TimerStatus } The timer status.
 */
export const selectTimerStatus = createSelector(
	selectSharedState,
	(state: SharedState) => state.timerStatus
);

/**
 * Selects the remaining time from the shared state.
 * @returns { number } The remaining time (in seconds).
 */
export const selectRemainingTime = createSelector(
	selectSharedState,
	(state: SharedState) => state.remainingTime
);

/**
 * Selects the progress from the shared state.
 * @returns { number } The progress of the timer.
 */
export const selectProgress = createSelector(
	selectSharedState,
	(state: SharedState) => state.progress
);

/**
 * Selects the schedules from the shared state.
 * @returns { Map<ScheduleType, ScheduleConfig> } The map of schedules.
 */
export const selectSchedules = createSelector(
	selectSharedState,
	(state: SharedState) => state.scheduleConfig
);

/**
 * Selects the any Error (or null) from the shared state.
 * @returns { Map<ScheduleType, ScheduleConfig> } The map of schedules.
 */
export const selectError = createSelector(
	selectSharedState,
	(state: SharedState) => state.error
);
