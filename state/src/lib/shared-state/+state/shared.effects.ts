import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ScheduleType, TimerMode } from '@ng-pomedoro/model';
import { SchedulesService } from '../../service/schedules.service';
import * as SharedStateActions from './shared.actions';

@Injectable()
export class SharedStateEffects {
	//
	constructor(
		private actions$: Actions,
		private schedulesService: SchedulesService
	) {}

	loadSchedules$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SharedStateActions.loadSchedules),
			mergeMap(() =>
				this.schedulesService.fetchSchedules().pipe(
					map((scheduleConfig) =>
						SharedStateActions.loadSchedulesSuccess({
							scheduleConfig,
						})
					),
					catchError((error) =>
						of(SharedStateActions.loadSchedulesFailure({ error }))
					)
				)
			)
		)
	);

	setInitialSettings$ = createEffect(() => {
		const timerMode = TimerMode.Pomodoro;
		return this.actions$.pipe(
			ofType(SharedStateActions.loadSchedulesSuccess),
			mergeMap(({ scheduleConfig }) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const config = scheduleConfig.get(ScheduleType.Classic)!; // TODO: handle null
				const schedule = config.sessions;
				const session = schedule[0];
				const duration = session.duration;
				return [
					SharedStateActions.setTimerMode({ timerMode }),
					SharedStateActions.setScheduleConfig({ config }),
					SharedStateActions.setSchedule({ schedule }),
					SharedStateActions.setSession({ session }),
					SharedStateActions.setTimerDuration({ duration }),
				];
			})
		);
	});
}
