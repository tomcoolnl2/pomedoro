import { Component } from '@angular/core';

export enum ScheduleIndicator {
	POMODORO = 'pomodoro',
	SHORT_BREAK = 'short-break',
	LONG_BREAK = 'long-break',
}

@Component({
	selector: 'ui-schedule-indicator',
	templateUrl: './schedule-indicator.component.html',
	styleUrl: './schedule-indicator.component.css',
})
export class ScheduleIndicatorComponent {
	//
	selectedSchedule: ScheduleIndicator;

	scheduleIndicatorEnum = ScheduleIndicator;

	constructor() {
		this.selectedSchedule = ScheduleIndicator.POMODORO;
	}

	handleSelectedScheduleChange(selectedSchedule: ScheduleIndicator) {
		this.selectedSchedule = selectedSchedule;
	}
}
