import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimerStatus } from '@ng-pomedoro/model';
import { SharedStateFacade } from '@ng-pomedoro/state';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'ui-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
	//
	@Input() time!: number;
	totalTime!: number;
	circumference = 2 * Math.PI * 90;
	dashOffset = 0;
	percentage = 100; // state.progress
	timerStatus!: TimerStatus;
	TimerStatus = TimerStatus;

	private destroy$ = new Subject<void>();

	constructor(private sharedStateFacade: SharedStateFacade) {}

	ngOnInit(): void {
		this.totalTime = this.time;

		this.sharedStateFacade.startTimer().subscribe((timerStatus) => {
			this.timerStatus = timerStatus;
			this.handleTimerStatusChange(timerStatus);
		});

		this.updateCircle();
	}

	handleTimerStatusChange(timerStatus: TimerStatus) {
		switch (timerStatus) {
			case TimerStatus.Started:
			case TimerStatus.Running:
				this.startTimer();
				break;
			case TimerStatus.Paused:
				this.pauseTimer();
				break;
		}
	}

	startTimer() {
		interval(1000)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				if (this.time > 0) {
					this.time--;
					this.updateCircle();
				} else {
					this.sharedStateFacade.pauseTimer();
				}
			});
	}

	pauseTimer() {
		this.destroy$.next();
	}

	toggleTimer() {
		if (this.timerStatus === TimerStatus.Paused) {
			this.sharedStateFacade.resumeTimer();
		} else {
			this.sharedStateFacade.pauseTimer();
		}
	}

	updateCircle(): void {
		this.percentage = (this.time / this.totalTime) * 100;
		this.dashOffset = this.circumference * (1 - this.time / this.totalTime);
	}

	formatTime(): string {
		const minutes = (this.time / 60) << 0;
		const seconds = this.time % 60;
		return `${this.pad(minutes)}:${this.pad(seconds)}`;
	}

	private pad(value: number): string {
		return value < 10 ? '0' + value : value.toString();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
