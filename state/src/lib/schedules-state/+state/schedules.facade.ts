import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from '@ng-pomedoro/model';
import { SchedulesState } from './schedules.state';
import { getSchedules } from './schedules.selectors';
import * as SchedulesActions from './schedules.actions';

@Injectable({
	providedIn: 'root',
})
export class SchedulesFacade {
	//
	constructor(private store: Store<SchedulesState>) {}

	get schedules$(): Observable<Course[]> {
		return this.store.select(getSchedules);
	}

	loadSchedules(): Observable<Course[]> {
		this.store.dispatch(SchedulesActions.loadSchedules());
		return this.schedules$; // Return the observable
	}
}
