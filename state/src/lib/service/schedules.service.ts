import { Observable, map, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PomodoroSchedule } from '@ng-pomedoro/model';

@Injectable({
	providedIn: 'root',
})
export class SchedulesService {
	//
	private baseUrl = 'http://localhost:3000/api'; // TODO: env variable

	constructor(private http: HttpClient) {}

	fetchSchedules(): Observable<PomodoroSchedule[]> {
		return this.http
			.get<{ payload: PomodoroSchedule[] }>(`${this.baseUrl}/schedules`)
			.pipe(
				map((res) => res.payload),
				shareReplay()
			);
	}
}
