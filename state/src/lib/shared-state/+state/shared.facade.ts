import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { take, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { ScheduleConfig, Session, TimerMode, TimerStatus } from '@pomodoro/model';
import { SharedState } from './shared.state';
import * as SharedStateActions from './shared.actions';
import * as SharedStateSelectors from './shared.selectors';

@Injectable({
	providedIn: 'root',
})
export class SharedStateFacade {
	//
	private timerSubscription: Subscription | null = null;
	private timerActive = new BehaviorSubject<boolean>(false);

	constructor(private store: Store<SharedState>) {}

	startTimer(): void {
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
						SharedStateActions.setTimerRemaining({
							remainingTime: remaining,
						})
					);

					if (remaining <= 0) {
						this.pauseTimer(); // Automatically pause when time runs out
						// dispatch timer end
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

	selectScheduleConfig(): Observable<Map<string, ScheduleConfig> | null> {
		return this.store.select(SharedStateSelectors.selectConfig);
	}

	selectSchedule(): Observable<Session[] | null> {
		return this.store.select(SharedStateSelectors.selectSchedule);
	}

	selectSession(): Observable<Session | null> {
		return this.store.select(SharedStateSelectors.selectSession);
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

	selectTimerMode(): Observable<TimerMode | null> {
		return this.store.select(SharedStateSelectors.selectTimerMode);
	}

	loadSchedules(): Observable<Map<string, ScheduleConfig> | null> {
		this.store.dispatch(SharedStateActions.loadSchedules());
		return this.store.select(SharedStateSelectors.selectConfig).pipe(take(1));
	}

	selectError(): Observable<Error | null> {
		return this.store.select(SharedStateSelectors.selectError);
	}
}
