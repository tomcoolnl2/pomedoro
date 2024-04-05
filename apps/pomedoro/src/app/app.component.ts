import { BehaviorSubject, catchError, finalize, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '@ng-pomedoro/model';
import { LoadingIndicatorService, NotificationsService, NotificationTypeEnum } from '@ng-pomedoro/ui';
import { ScheduleApiService } from './services/schedule-api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	//
	public readonly title = 'Pomedoro';

	constructor(
		private scheduleApiService: ScheduleApiService,
		private loadingIndicatorService: LoadingIndicatorService,
		private notificationsService: NotificationsService
	) { }

	courses$ = new BehaviorSubject<Course[] | null>(null);

	beginnerCourses$ = new BehaviorSubject<Course[] | null>(null);

	advancedCourses$ = new BehaviorSubject<Course[] | null>(null);

	ngOnInit() {
		this.subscribeToDataChanges();
		this.fetchSchedules();
	}

	fetchSchedules() {
		//
		this.loadingIndicatorService.show();

		this.scheduleApiService
			.fetchSchedules()
			.pipe(
				// Catch any errors that occur during the HTTP request
				catchError((error) => {
					// Log the error
					console.error('There was an error!', error);
					// Hide loading indicator if an error occurs
					this.loadingIndicatorService.hide();
					// Re-throw the error to propagate it to the subscriber
					return throwError(() => new Error(error));
				}),
				// Hide loading indicator regardless of success or error
				finalize(() => this.loadingIndicatorService.hide()),
			)
			.subscribe({
				next: (data) => {
					this.courses$.next(data);
				},
				error: (error) => {
					// This block will be triggered only if an error occurs after catchError
					console.error('An error occurred after catchError!', error);
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

	handleOpenSettingsDialog = () => {
		const notification = {
			message: 'This is a toast message',
			type: NotificationTypeEnum.Success
		}
		this.notificationsService.addNotification(notification);
	}

	triggerError = () => {
		const notification = {
			message: 'This is a ERROR message',
			type: NotificationTypeEnum.Error,
			persistent: true
		}
		this.notificationsService.addNotification(notification);
	}
}
