// eslint-disable-next-line @nx/enforce-module-boundaries
import { PomodoroSchedule, TimerMode, TimerStatus } from '@ng-pomedoro/model';

export const sharedStateId = 'shared-state';
/**
 * Represents the state shared across different components related to the Pomodoro timer.
 */
export interface SharedState {
	/** The total timer time. */
	duration: number;

	/** The current timer mode. */
	currentTimerMode: TimerMode;

	/** The status of the timer (e.g., started, stopped, completed). */
	timerStatus: TimerStatus;

	/** The progress of the current timer interval, as a percentage. */
	progress: number;

	/** The remaining time (in seconds) of the current timer interval. */
	remainingTime: number;

	/** The number of completed work sessions (Pomodoros). */
	currentSession: number;

	/** An array of available Pomodoro schedules. */
	schedules: PomodoroSchedule[];
}

/** The initial state for the SharedState interface. */
export const initialState: SharedState = {
	duration: 0,
	currentTimerMode: TimerMode.Pomodoro,
	timerStatus: TimerStatus.Started,
	progress: 0,
	remainingTime: 0,
	currentSession: 0,
	schedules: [],
};
