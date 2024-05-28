import { PomodoroSchedule } from '@ng-pomedoro/model';

const classicPomodoro: PomodoroSchedule = {
	name: 'Classic Pomodoro',
	workDuration: 25,
	shortBreakDuration: 5,
	longBreakDuration: 15,
	sessionsBeforeLongBreak: 4,
};

const productivityBoost: PomodoroSchedule = {
	name: 'Productivity Boost',
	workDuration: 50,
	shortBreakDuration: 10,
	longBreakDuration: 30,
	sessionsBeforeLongBreak: 2,
};

const ultraFocus: PomodoroSchedule = {
	name: 'Ultra Focus',
	workDuration: 90,
	shortBreakDuration: 20,
	longBreakDuration: 40,
	sessionsBeforeLongBreak: 1,
};

export const schedules: PomodoroSchedule[] = [
	classicPomodoro,
	productivityBoost,
	ultraFocus,
];
