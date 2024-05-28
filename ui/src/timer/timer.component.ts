import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimerStatus } from '@ng-pomedoro/model';
import { SharedStateFacade } from '@ng-pomedoro/state';

@Component({
	selector: 'ui-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
	//
	@Input() time!: number; // TODO: PomodoroSchedule
	duration!: number;
	circumference = 2 * Math.PI * 90;
	dashOffset = 0;
	progress = 100;
	timerStatus!: TimerStatus;
	TimerStatus = TimerStatus;

	private destroy$ = new Subject<void>();

	constructor(private sharedStateFacade: SharedStateFacade) {}

	ngOnInit(): void {
		this.sharedStateFacade
			.setTimerDuration(this.time)
			.subscribe((duration) => {
				this.duration = duration;
				this.updateCircle();
			});

		this.sharedStateFacade.startTimer().subscribe((timerStatus) => {
			this.timerStatus = timerStatus;
			this.handleTimerStatusChange(timerStatus);
		});
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
		this.progress = (this.time / this.duration) * 100;
		this.dashOffset = this.circumference * (1 - this.time / this.duration);
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
