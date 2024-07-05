import { Observable, map, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScheduleConfig, ScheduleType, jsonToMap } from '@ng-pomodoro/model';

@Injectable({
	providedIn: 'root',
})
export class SchedulesService {
	//
	private baseUrl = 'http://localhost:3000/api'; // TODO: env variable

	constructor(private http: HttpClient) {}

	fetchSchedules(): Observable<Map<ScheduleType, ScheduleConfig>> {
		return this.http
			.get<{ payload: string }>(`${this.baseUrl}/schedules`)
			.pipe(
				map(
					(res) =>
						jsonToMap(res.payload) as Map<
							ScheduleType,
							ScheduleConfig
						>
				),
				shareReplay()
			);
	}
}
