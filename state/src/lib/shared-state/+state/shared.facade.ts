import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PomodoroSchedule, TimerStatus } from '@ng-pomedoro/model';
import { SharedState } from './shared.state';
import * as SharedStateSelectors from './shared.selectors';
import * as SharedStateActions from './shared.actions';

@Injectable({
	providedIn: 'root',
})
export class SharedStateFacade {
	//
	constructor(private store: Store<SharedState>) {}

	setTimerDuration(duration: number): Observable<number> {
		this.store.dispatch(SharedStateActions.setTimerDuration({ duration }));
		return this.store.select(SharedStateSelectors.selectTimerDuration);
	}

	startTimer(): Observable<TimerStatus> {
		this.store.dispatch(
			SharedStateActions.setTimerStatus({
				timerStatus: TimerStatus.Started,
			})
		);
		// Do additional stuff
		this.store.dispatch(
			SharedStateActions.setTimerStatus({
				timerStatus: TimerStatus.Running,
			})
		);
		return this.store.select(SharedStateSelectors.selectTimerStatus);
	}

	pauseTimer(): Observable<TimerStatus> {
		this.store.dispatch(
			SharedStateActions.setTimerStatus({
				timerStatus: TimerStatus.Paused,
			})
		);
		return this.store.select(SharedStateSelectors.selectTimerStatus);
	}

	resumeTimer(): Observable<TimerStatus> {
		this.store.dispatch(
			SharedStateActions.setTimerStatus({
				timerStatus: TimerStatus.Running,
			})
		);
		return this.store.select(SharedStateSelectors.selectTimerStatus);
	}

	loadSchedules(): Observable<PomodoroSchedule[]> {
		this.store.dispatch(SharedStateActions.loadSchedules());
		console.log(
			'loadSchedules',
			this.store.select(SharedStateSelectors.selectSchedules)
		);
		return this.store.select(SharedStateSelectors.selectSchedules);
	}
}
