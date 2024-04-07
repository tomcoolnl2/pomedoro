import { Component, Input, OnDestroy } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'ui-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnDestroy {
	//
	@Input() initialTime = 180;
	timeLeft = 0;
	private timeLeftSubscription: Subscription;

	constructor(private timerService: TimerService) {
		this.timeLeftSubscription = this.timerService.timeLeft$.subscribe(
			(time) => {
				console.log(time);
				this.timeLeft = time;
			}
		);

		this.reset().start();
	}

	ngOnDestroy(): void {
		this.timeLeftSubscription.unsubscribe();
	}

	setTime(timeInSeconds: number): void {
		this.timerService.setTime(timeInSeconds);
	}

	play(): void {
		this.timerService.play();
	}

	pause(): void {
		this.timerService.pause();
	}

	reset(): TimerService {
		return this.timerService.setTime(this.initialTime);
	}

	formatTime(timeInSeconds: number): string {
		const minutes = (timeInSeconds / 60) << 0;
		const seconds = timeInSeconds % 60;
		return `${this.pad(minutes)}:${this.pad(seconds)}`;
	}

	private pad(value: number): string {
		return value < 10 ? '0' + value : value.toString();
	}
}
