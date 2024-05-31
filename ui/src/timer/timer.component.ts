import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TimerStatus } from '@ng-pomedoro/model';
import { SharedStateFacade } from '@ng-pomedoro/state';

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

	public circumference = 2 * Math.PI * 90;
	public dashOffset = 0;
	public progress = 100;

	constructor(private sharedStateFacade: SharedStateFacade) {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['remainingTime']) {
			this.remainingTime = changes['remainingTime'].currentValue;
			this.updateCircle();
		}
	}

	public toggleTimer() {
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
		const delta = this.remainingTime / this.duration;
		this.progress = delta * 100;
		this.dashOffset = this.circumference * (1 - delta);
	}

	public getTimerClassName(status: TimerStatus): string {
		switch (status) {
			case TimerStatus.Running:
				return 'active';
			default:
				return 'inactive';
		}
	}

	public formatTime(time: number): string {
		const minutes = (time / 60) << 0;
		const seconds = time % 60;
		return `${this.pad(minutes)}:${this.pad(seconds)}`;
	}

	private pad(value: number): string {
		return value < 10 ? '0' + value : value.toString();
	}
}
