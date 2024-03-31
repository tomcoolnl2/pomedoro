import { BehaviorSubject, finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '@ng-pomedoro/model';
import { LoadingIndicatorService } from '@ng-pomedoro/ui';
import { ScheduleApiService } from './services/schedule-api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	//
	public readonly title = 'Pomedoro';

	constructor(
		private scheduleApiService: ScheduleApiService,
		private loadingIndicatorService: LoadingIndicatorService
	) {}

	courses$ = new BehaviorSubject<Course[] | null>(null);

	beginnerCourses$ = new BehaviorSubject<Course[] | null>(null);

	advancedCourses$ = new BehaviorSubject<Course[] | null>(null);

	ngOnInit() {
		this.subscribeToBeginnerCoursesChanges();
		this.subscribeToAdvancedCoursesChanges();

		this.subscribeToDataChanges();
		this.fetchCourses();
	}

	fetchCourses() {
		// Show loading indicator
		this.loadingIndicatorService.loadingOn();

		this.scheduleApiService
			.fetchCourses()
			.pipe(finalize(() => this.loadingIndicatorService.loadingOff()))
			.subscribe({
				next: (data) => {
					this.courses$.next(data);
				},
				error: (error) => {
					console.error('There was an error!', error);
				},
			});
	}

	subscribeToDataChanges() {
		this.courses$.subscribe({
			next: (data) => {
				if (data !== null) {
					data.sort(sortCoursesBySeqNo);
					this.beginnerCourses$.next(
						data.filter((course) => course.category === 'BEGINNER')
					);
					this.advancedCourses$.next(
						data.filter((course) => course.category === 'ADVANCED')
					);
					console.log('Data has changed:', data);
				}
			},
		});
	}

	subscribeToBeginnerCoursesChanges() {
		this.beginnerCourses$.subscribe({
			next: (data) => console.log('BEGINNER', data),
		});
	}

	subscribeToAdvancedCoursesChanges() {
		this.advancedCourses$.subscribe({
			next: (data) => console.log('ADVANCED', data),
		});
	}
}
