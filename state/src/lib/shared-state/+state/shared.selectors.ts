import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState, sharedStateId } from './shared.state';

/**
 * Selects the feature state from the NgRx store.
 * @returns { SharedState } The shared state.
 */

const selectSharedState = createFeatureSelector<SharedState>(sharedStateId);

/**
 * Selects the schedules from the shared state.
 * @returns { Map<ScheduleType, ScheduleConfig> } The map of schedules.
 */
export const selectConfig = createSelector(
	selectSharedState,
	(state: SharedState) => state.scheduleConfig
);
/**
 * Selects the current session from the shared state.
 * @returns { Session[] | null } The current session.
 */
export const selectSchedule = createSelector(
	selectSharedState,
	(state: SharedState) => state.schedule
);

/**
 * Selects the current session from the shared state.
 * @returns { Session | null } The current session.
 */
export const selectSession = createSelector(
	selectSharedState,
	(state: SharedState) => state.session
);

/**
 * Selects the current timer mode from the shared state.
 * @returns { TimerMode } The current timer mode.
 */
export const selectTimerDuration = createSelector(
	selectSharedState,
	(state: SharedState) => state.session?.duration ?? 0
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
 * Selects the any Error (or null) from the shared state.
 * @returns { Map<ScheduleType, ScheduleConfig> } The map of schedules.
 */
export const selectError = createSelector(
	selectSharedState,
	(state: SharedState) => state.error
);
