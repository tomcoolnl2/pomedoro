import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import * as SharedStateActions from './shared.actions';
import * as SharedStateSelectors from './shared.selectors';
import { PomodoroSchedule, TimerStatus } from '@ng-pomedoro/model';
import { SharedState } from './shared.state';

@Injectable({
	providedIn: 'root',
})
export class SharedStateFacade {
	private timerSubscription: Subscription | null = null;
	private timerActive = new BehaviorSubject<boolean>(false);

	constructor(private store: Store<SharedState>) {}

	setTimerDuration(duration: number): void {
		this.store.dispatch(SharedStateActions.setTimerDuration({ duration }));
	}

	startTimer(): void {
		// Set the initial remaining time if it's not already set
		this.store
			.select(SharedStateSelectors.selectRemainingTime)
			.pipe(
				take(1), // Take the current remaining time value
				tap((remainingTime) => {
					if (remainingTime === 0) {
						// If remaining time is 0, set it to the initial duration
						this.store
							.select(SharedStateSelectors.selectTimerDuration)
							.pipe(
								take(1),
								tap((duration) => {
									this.store.dispatch(
										SharedStateActions.setTimerRemaining({
											remaining: duration,
										})
									);
								})
							)
							.subscribe();
					}
				})
			)
			.subscribe();

		// Start the timer
		this.store.dispatch(
			SharedStateActions.setTimerStatus({
				timerStatus: TimerStatus.Running,
			})
		);

		this.timerActive.next(true);

		this.timerSubscription = timer(0, 1000)
			.pipe(
				withLatestFrom(
					this.store.select(SharedStateSelectors.selectRemainingTime),
					this.store.select(SharedStateSelectors.selectTimerDuration)
				),
				takeWhile(([_, remainingTime]) => remainingTime > 0),
				tap(([_, remainingTime, duration]) => {
					const remaining = remainingTime - 1;
					const progress = (remaining / duration) * 100;

					this.store.dispatch(
						SharedStateActions.setTimerRemaining({ remaining })
					);
					this.store.dispatch(
						SharedStateActions.setTimerProgress({ progress })
					);

					if (remaining <= 0) {
						this.pauseTimer(); // Automatically pause when time runs out
					}
				})
			)
			.subscribe();
	}

	pauseTimer(): void {
		this.store.dispatch(
			SharedStateActions.setTimerStatus({
				timerStatus: TimerStatus.Paused,
			})
		);
		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
			this.timerSubscription = null;
		}
		this.timerActive.next(false);
	}

	resumeTimer(): void {
		if (!this.timerActive.value) {
			this.startTimer();
		}
	}

	isTimerActive(): Observable<boolean> {
		return this.timerActive.asObservable();
	}

	selectTimerStatus(): Observable<TimerStatus> {
		return this.store.select(SharedStateSelectors.selectTimerStatus);
	}

	selectTimerDuration(): Observable<number> {
		return this.store.select(SharedStateSelectors.selectTimerDuration);
	}

	selectRemainingTime(): Observable<number> {
		return this.store.select(SharedStateSelectors.selectRemainingTime);
	}

	selectProgress(): Observable<number> {
		return this.store.select(SharedStateSelectors.selectProgress);
	}

	loadSchedules(): Observable<PomodoroSchedule[]> {
		this.store.dispatch(SharedStateActions.loadSchedules());
		return this.store
			.select(SharedStateSelectors.selectSchedules)
			.pipe(take(1));
	}
}
