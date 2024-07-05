import {
	Session,
	ScheduleConfig,
	ScheduleType,
	SessionType,
	mapToJson,
} from '@ng-pomodoro/model';

function formatSchedule(config: ScheduleConfig): Session[] {
	const sessions: Session[] = [];
	let sessionIndex = 0;
	for (let i = 0, { sequence } = config; i < sequence; i++) {
		sessions.push({
			type: SessionType.Pomodoro,
			duration: config[SessionType.Pomodoro],
			index: sessionIndex++,
		});
		if (i < sequence - 1) {
			sessions.push({
				type: SessionType.ShortBreak,
				duration: config[SessionType.ShortBreak],
				index: sessionIndex++,
			});
		}
	}
	sessions.push({
		type: SessionType.LongBreak,
		duration: config[SessionType.LongBreak],
		index: sessionIndex++,
	});
	return sessions;
}

const classicPomodoro: ScheduleConfig = {
	type: ScheduleType.Classic,
	[SessionType.Pomodoro]: 3,
	[SessionType.ShortBreak]: 4,
	[SessionType.LongBreak]: 5,
	sequence: 2,
	sessions: null,
};

// const classicPomodoro: ScheduleConfig = {
// 	type: ScheduleType.Classic,
// 	[SessionType.Pomodoro]: 25 * 60,
// 	[SessionType.ShortBreak]: 5 * 60,
// 	[SessionType.LongBreak]: 15 * 60,
// 	sequence: 4,
// 	sessions: null,
// };

const productivityBoost: ScheduleConfig = {
	type: ScheduleType.Productive,
	[SessionType.Pomodoro]: 50 * 60,
	[SessionType.ShortBreak]: 10 * 60,
	[SessionType.LongBreak]: 30 * 60,
	sequence: 2,
	sessions: null,
};

const ultraFocus: ScheduleConfig = {
	type: ScheduleType.Ultra,
	[SessionType.Pomodoro]: 90 * 60,
	[SessionType.ShortBreak]: 20 * 60,
	[SessionType.LongBreak]: 40 * 60,
	sequence: 1,
	sessions: null,
};

const scheduleConfig = new Map<ScheduleType, ScheduleConfig>(
	[classicPomodoro, productivityBoost, ultraFocus].map((config) => {
		const sessions = formatSchedule(config);
		return [config.type, { ...config, sessions }];
	})
);

export default mapToJson(scheduleConfig);
