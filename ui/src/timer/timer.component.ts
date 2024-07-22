import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TimerStatus } from '@pomodoro/model';
import { SharedStateFacade } from '@pomodoro/state';

@Component({
	selector: 'ui-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnChanges {
	//
	@Input() duration!: number;
	@Input() remainingTime!: number;
	@Input() timerStatus!: TimerStatus;
	@Input() timerActive!: boolean;

	readonly circumference = 2 * Math.PI * 90;
	public dashOffset = 0;

	constructor(private sharedStateFacade: SharedStateFacade) {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['remainingTime']) {
			this.updateCircle();
		}
	}

	public toggleTimer(): void {
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

	private updateCircle(): void {
		const ratio = this.remainingTime / this.duration;
		this.dashOffset = this.circumference * (1 - ratio);
	}

	public getTimerClassName(status: TimerStatus): string {
		return status === TimerStatus.Running ? 'active' : 'inactive';
	}

	public formatTime(time: number): string {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${this.pad(minutes)}:${this.pad(seconds)}`;
	}

	private pad(value: number): string {
		return value < 10 ? '0' + value : value.toString();
	}
}
