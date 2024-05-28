import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TimerStatus } from '@ng-pomedoro/model';
import { SharedStateFacade } from '@ng-pomedoro/state';

@Component({
	selector: 'ui-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
	//
	@Input() duration!: number;
	circumference = 2 * Math.PI * 90;
	dashOffset = 0;
	progress = 100;
	timerStatus!: TimerStatus;
	formattedDuration!: string;
	iconName: 'faPlay' | 'faPause' = 'faPlay';
	timerClassName: 'active' | 'inactive' = 'inactive';

	private destroy$ = new Subject<void>();

	constructor(private sharedStateFacade: SharedStateFacade) {}

	ngOnInit(): void {
		//
		this.sharedStateFacade.setTimerDuration(this.duration);

		this.sharedStateFacade
			.selectTimerDuration()
			.pipe(takeUntil(this.destroy$))
			.subscribe((duration) => {
				console.log('duration', duration);
				this.formattedDuration = this.formatTime(duration);
			});

		this.sharedStateFacade
			.selectTimerStatus()
			.pipe(takeUntil(this.destroy$))
			.subscribe((status) => {
				this.timerStatus = status;
				this.timerClassName = this.setTimerClassName(status);
			});

		this.sharedStateFacade
			.selectRemainingTime()
			.pipe(takeUntil(this.destroy$))
			.subscribe((remainingTime) => {
				this.updateCircle(remainingTime);
				this.formattedDuration = this.formatTime(remainingTime);
			});

		this.sharedStateFacade
			.isTimerActive()
			.pipe(takeUntil(this.destroy$))
			.subscribe((active) => {
				this.iconName = active ? 'faPause' : 'faPlay';
			});
	}

	toggleTimer() {
		switch (this.timerStatus) {
			case TimerStatus.Initial:
				this.sharedStateFacade.startTimer();
				break;
			case TimerStatus.Paused:
				this.sharedStateFacade.resumeTimer();
				break;
			default:
				this.sharedStateFacade.pauseTimer();
				break;
		}
	}

	private updateCircle(remainingTime: number): void {
		this.progress = (remainingTime / this.duration) * 100;
		this.dashOffset =
			this.circumference * (1 - remainingTime / this.duration);
		console.log(this.dashOffset);
	}

	private setTimerClassName(status: TimerStatus): 'active' | 'inactive' {
		switch (status) {
			case TimerStatus.Running:
				return 'active';
			default:
				return 'inactive';
		}
	}

	private formatTime(time: number): string {
		const minutes = (time / 60) << 0;
		const seconds = time % 60;
		console.log(`${this.pad(minutes)}:${this.pad(seconds)}`);
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
