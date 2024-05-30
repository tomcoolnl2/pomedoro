import {
	ScheduleConfig,
	ScheduleType,
	Session,
	TimerMode,
	TimerStatus,
} from '@ng-pomedoro/model';

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
	/** The total timer time. */
	duration: number;
	/** The current timer mode. */
	timerMode: TimerMode | null;
	/** The status of the timer (e.g., started, stopped, completed). */
	timerStatus: TimerStatus;
	/** The progress of the current timer interval, as a percentage. */
	progress: number;
	/** The remaining time (in seconds) of the current timer interval. */
	remainingTime: number;
	/** An collection of available Pomodoro schedules. */
	scheduleConfig: Map<ScheduleType, ScheduleConfig> | null;
}

/** The initial state for the SharedState interface. */
export const initialSharedState: SharedState = {
	config: null,
	session: null,
	schedule: null,
	duration: 0, // TODO: replace with session.duration
	timerMode: null,
	timerStatus: TimerStatus.Initial,
	progress: 0,
	remainingTime: 0,
	scheduleConfig: null,
};
