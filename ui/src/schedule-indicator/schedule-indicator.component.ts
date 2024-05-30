import { Component, OnInit } from '@angular/core';
import { TimerMode } from '@ng-pomedoro/model';
import { SharedStateFacade } from '@ng-pomedoro/state';
import { take, takeUntil, tap } from 'rxjs';

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
export class ScheduleIndicatorComponent implements OnInit {
	//
	selectedSchedule!: ScheduleIndicator;

	scheduleIndicatorEnum = ScheduleIndicator;

	constructor(private sharedStateFacade: SharedStateFacade) {}

	ngOnInit(): void {
		this.selectedSchedule = ScheduleIndicator.POMODORO;

		// this.sharedStateFacade
		// 	.selectSchedules()
		// 	.pipe(
		// 		takeUntil((schedules) => schedules.length),
		// 		tap((schedules) => {
		// 			console.log('selectSchedules', schedules);
		// 			if (schedules.length === 0) {
		// 				this.selectedSchedule = ScheduleIndicator.POMODORO;
		// 			}
		// 		})
		// 	)
		// 	.subscribe();
	}

	handleSelectedScheduleChange(selectedSchedule: ScheduleIndicator) {
		this.selectedSchedule = selectedSchedule;
	}
}

/**
 * TODO:
 * - subscribe to state.schedules - app.component.ts
 * - disabled when no schedules are available (yet)
 * - set Pomodoro as default
 * - refactor out: scheduleIndicatorEnum
 * - read selectedSchedule from state
 * - unit test?
 *
 * - disable long/short break if none available (e.g. TimerMode.Countdown)
 */
