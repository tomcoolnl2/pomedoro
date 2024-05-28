export interface PomodoroSchedule {
	name: string;
	workDuration: number;
	shortBreakDuration: number;
	longBreakDuration: number;
	sessionsBeforeLongBreak: number;
}
