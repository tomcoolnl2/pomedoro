import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ScheduleType, TimerMode } from '@ng-pomodoro/model';
import { SchedulesService } from '../../service/schedules.service';
import { SharedStateFacade } from './shared.facade';
import * as SharedStateActions from './shared.actions';

@Injectable()
export class SharedStateEffects {
	//
	constructor(
		private sharedStateFacade: SharedStateFacade,
		private schedulesService: SchedulesService,
		private actions$: Actions
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
					catchError((error: Error) => {
						console.log('error', error);
						return of(SharedStateActions.throwError({ error }));
					})
				)
			)
		)
	);

	setInitialSettings$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SharedStateActions.loadSchedulesSuccess),
			map(({ scheduleConfig }) => {
				const config = scheduleConfig.get(ScheduleType.Classic);
				if (!config) {
					return SharedStateActions.throwError({
						error: new Error('Failed to set initial config.'),
					}); // TODO: Add custom error message
				}
				const timerMode = TimerMode.Pomodoro;
				const schedule = config.sessions;
				const session = schedule[0];
				const remainingTime = session.duration;
				return SharedStateActions.setInitialSettings({
					timerMode,
					config,
					schedule,
					session,
					remainingTime,
				});
			})
		)
	);

	endSession$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SharedStateActions.setTimerRemaining),
			filter(({ remainingTime }) => remainingTime <= 0),
			map(() => SharedStateActions.endSession())
		)
	);

	nextSession$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SharedStateActions.endSession),
			withLatestFrom(
				this.sharedStateFacade.selectSchedule(),
				this.sharedStateFacade.selectSession()
			),
			mergeMap(([_, schedule, prevSession]) => {
				if (!schedule || !prevSession) {
					return of(
						SharedStateActions.throwError({
							error: new Error('Schedule or session not found'), // More specific error message
						})
					);
				}

				const prevIndex = prevSession.index;
				const nextIndex =
					prevIndex + 1 >= schedule.length ? 0 : prevIndex + 1;
				const nextSession = schedule.find(
					(session) => session.index === nextIndex
				);

				if (!nextSession) {
					return of(
						SharedStateActions.throwError({
							error: new Error('Next session not found'), // More specific error message
						})
					);
				}

				// Suppose we also want to reset something every new session
				return of(
					SharedStateActions.setSession({ session: nextSession }),
					SharedStateActions.setTimerRemaining({
						remainingTime: nextSession.duration,
					})
				);
			})
		)
	);
}
