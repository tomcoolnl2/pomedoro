import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SchedulesService } from '../../service/schedules.service';
import * as SharedStateActions from './shared.actions';

@Injectable()
export class SharedStateEffects {
	loadSchedules$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SharedStateActions.loadSchedules),
			mergeMap(() =>
				this.schedulesService.fetchSchedules().pipe(
					map((schedules) =>
						SharedStateActions.loadSchedulesSuccess({ schedules })
					),
					catchError((error) =>
						of(SharedStateActions.loadSchedulesFailure({ error }))
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private schedulesService: SchedulesService
	) {}
}
