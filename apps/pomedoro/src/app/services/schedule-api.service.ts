import { Observable, map, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '@ng-pomedoro/model';

@Injectable({
	providedIn: 'root',
})
export class ScheduleApiService {
	//
	private baseUrl = 'http://localhost:3000/api';

	constructor(private http: HttpClient) {}

	fetchCourses(): Observable<Course[]> {
		return this.http
			.get<{ payload: Course[] }>(`${this.baseUrl}/courses`)
			.pipe(
				map((res) => res.payload),
				shareReplay()
			);
	}
}