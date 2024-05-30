import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { TimerStatus } from '@ng-pomedoro/model';
import { SharedStateFacade } from '@ng-pomedoro/state';

@Component({
	selector: 'ui-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
	//
	duration = 0;
	circumference = 2 * Math.PI * 90;
	dashOffset = 0;
	progress = 100;
	timerStatus!: TimerStatus;
	formattedDuration!: string;
	iconName: 'faPlay' | 'faPause' = 'faPlay';
	timerClassName: 'active' | 'inactive' = 'inactive';

	constructor(private sharedStateFacade: SharedStateFacade) {}

	ngOnInit(): void {
		//
		this.sharedStateFacade.selectTimerDuration().subscribe((duration) => {
			this.formattedDuration = this.formatTime(duration);
		});

		this.sharedStateFacade.selectTimerStatus().subscribe((status) => {
			this.timerClassName = this.setTimerClassName(status);
		});

		this.sharedStateFacade
			.selectRemainingTime()
			.subscribe((remainingTime) => {
				this.updateCircle(remainingTime);
				this.formattedDuration = this.formatTime(remainingTime);
			});

		this.sharedStateFacade.isTimerActive().subscribe((active) => {
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
		const delta = remainingTime / this.duration;
		this.progress = delta * 100;
		this.dashOffset = this.circumference * (1 - delta);
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
		return `${this.pad(minutes)}:${this.pad(seconds)}`;
	}

	private pad(value: number): string {
		return value < 10 ? '0' + value : value.toString();
	}
}
