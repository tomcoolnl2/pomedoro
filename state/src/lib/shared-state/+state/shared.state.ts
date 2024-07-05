import {
	ScheduleConfig,
	ScheduleType,
	Session,
	TimerMode,
	TimerStatus,
} from '@ng-pomodoro/model';

export const sharedStateId = 'shared-state';
/**
 * Represents the state shared across different components related to the Pomodoro timer.
 */
export interface SharedState {
	/** The the current config. */
	config: ScheduleConfig | null;
	/** The the current session. */
	session: Session | null;
	/** The number of sessions (Pomodoros). */
	schedule: Session[] | null;
	/** The current timer mode. */
	timerMode: TimerMode | null;
	/** The status of the timer (e.g., started, stopped, completed). */
	timerStatus: TimerStatus;
	/** The remaining time (in seconds) of the current timer interval. */
	remainingTime: number;
	/** An collection of available Pomodoro schedules. */
	scheduleConfig: Map<ScheduleType, ScheduleConfig> | null;
	/** Error | null */
	error: Error | null;
}

/** The initial state for the SharedState interface. */
export const initialSharedState: SharedState = {
	config: null,
	session: null,
	schedule: null,
	timerMode: null,
	timerStatus: TimerStatus.Initial,
	remainingTime: 0,
	scheduleConfig: null,
	error: null,
};
