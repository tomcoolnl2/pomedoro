export enum ScheduleType {
	Classic = 'Classic Pomodoro',
	Productive = 'Productivity Boost',
	Ultra = 'Ultra Focus',
}

export enum SessionType {
	Pomodoro = 'Pomodoro',
	ShortBreak = 'ShortBreak',
	LongBreak = 'LongBreak',
}

export interface ScheduleConfig {
	type: ScheduleType;
	[SessionType.Pomodoro]: number;
	[SessionType.ShortBreak]: number;
	[SessionType.LongBreak]: number;
	sequence: number;
	sessions: Session[];
}

export interface Session {
	type: SessionType;
	duration: number;
}
