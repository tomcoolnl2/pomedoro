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
	@Input() time!: number;
	circumference = 2 * Math.PI * 90;
	dashOffset = 0;
	progress = 100;
	timerStatus!: TimerStatus;
	formattedDuration!: string;
	iconName: 'faPlay' | 'faPause' = 'faPlay';

	private destroy$ = new Subject<void>();

	constructor(private sharedStateFacade: SharedStateFacade) {
		this.formattedDuration = this.formatTime(this.time);
	}

	ngOnInit(): void {
		//
		this.sharedStateFacade.setTimerDuration(this.time);

		this.sharedStateFacade
			.selectTimerStatus()
			.pipe(takeUntil(this.destroy$))
			.subscribe((status) => {
				this.timerStatus = status;
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
		if (this.timerStatus === TimerStatus.Initial) {
			this.sharedStateFacade.startTimer();
		} else if (this.timerStatus === TimerStatus.Paused) {
			this.sharedStateFacade.resumeTimer();
		} else {
			this.sharedStateFacade.pauseTimer();
		}
	}

	updateCircle(remainingTime: number): void {
		this.progress = (remainingTime / this.time) * 100;
		this.dashOffset = this.circumference * (1 - remainingTime / this.time);
	}

	formatTime(time: number): string {
		const minutes = (time / 60) << 0;
		const seconds = time % 60;
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
