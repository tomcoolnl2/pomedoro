// timer.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class TimerService implements OnDestroy {
	//
	private destroy$ = new Subject<void>();
	private paused$ = new BehaviorSubject<boolean>(false);
	timeLeft$ = new BehaviorSubject<number>(0);

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	start(): void {
		interval(1000)
			.pipe(
				takeUntil(this.destroy$),
				switchMap(() => this.paused$),
				tap((paused) => console.log('Paused:', paused)),
				takeWhile((paused) => !paused)
			)
			.subscribe(() => {
				const remainingTime = this.timeLeft$.value;
				if (remainingTime > 0) {
					this.timeLeft$.next(remainingTime - 1);
				} else {
					this.destroy$.next();
				}
			});
	}

	setTime(timeInSeconds: number): TimerService {
		this.timeLeft$.next(timeInSeconds);
		return this;
	}

	play(): void {
		this.paused$.next(false);
	}

	pause(): void {
		this.paused$.next(true);
	}
}
