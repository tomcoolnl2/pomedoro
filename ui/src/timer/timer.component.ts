import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
	percentage = 100; // TODO still used?
	isPaused = false;

	private destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.totalTime = this.time;
		this.startTimer();
		this.updateCircle();
	}

	startTimer() {
		interval(1000)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				if (this.time > 0) {
					this.time--;
					this.updateCircle();
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
