import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SchedulesService } from './schedules.service';
import * as SchedulesActions from './schedules.actions';

@Injectable()
export class SchedulesEffects {
	loadTickets$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SchedulesActions.loadSchedules),
			mergeMap(() =>
				this.schedulesService.fetchSchedules().pipe(
					map((schedules) =>
						SchedulesActions.loadSchedulesSuccess({ schedules })
					),
					catchError((error) =>
						of(SchedulesActions.loadSchedulesFailure({ error }))
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
