import { Component, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'ui-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnDestroy {
	//
	timer = 60; // Initial countdown time in seconds
	isPaused = false;
	private destroy$ = new Subject<void>();

	constructor() {
		this.startTimer();
	}

	startTimer() {
		interval(1000)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				if (this.timer > 0) {
					this.timer--;
				} else {
					this.pauseTimer();
				}
			});
	}

	pauseTimer() {
		this.destroy$.next();
	}

	toggleTimer() {
		this.isPaused = !this.isPaused;
		if (this.isPaused) {
			this.pauseTimer();
		} else {
			this.startTimer();
		}
	}

	formatTime(): string {
		const minutes = (this.timer / 60) << 0;
		const seconds = this.timer % 60;
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
