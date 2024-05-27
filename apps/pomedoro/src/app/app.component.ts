import { BehaviorSubject, catchError, finalize, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Course } from '@ng-pomedoro/model';
import {
	LoadingIndicatorService,
	NotificationsService,
	NotificationTypeEnum,
	ModalService,
} from '@ng-pomedoro/ui';
import { SchedulesFacade } from '@ng-pomedoro/state';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	//
	public readonly title = 'Pomedoro';

	constructor(
		private schedulesFacade: SchedulesFacade,
		private loadingIndicatorService: LoadingIndicatorService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	schedules$ = new BehaviorSubject<Course[] | null>(null);
	beginnerCourses$ = new BehaviorSubject<Course[] | null>(null);
	advancedCourses$ = new BehaviorSubject<Course[] | null>(null);

	ngOnInit() {
		this.subscribeToDataChanges();
		this.fetchSchedules();
	}

	fetchSchedules() {
		this.loadingIndicatorService.show();
		this.schedulesFacade
			.loadSchedules()
			.pipe(
				catchError((error) => {
					console.error('There was an error!', error);
					return throwError(() => new Error(error));
				}),
				finalize(() => {
					console.info('Finalizing...');
					this.loadingIndicatorService.hide();
				})
			)
			.subscribe({
				next: (data) => {
					this.schedules$.next(data);
				},
				error: (error) => {
					// This block will be triggered only if an error occurs after catchError
					console.error('An error occurred after catchError!', error);
				},
			});
	}

	subscribeToDataChanges() {
		this.schedules$.subscribe({
			next: (data) => {
				if (data !== null) {
					this.loadingIndicatorService.hide();
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
		this.modalService.open();
	};

	handleApplySettings = () => {
		this.modalService.close();
	};

	triggerError = () => {
		const notification = {
			message: 'This is a ERROR message',
			type: NotificationTypeEnum.Error,
			persistent: true,
		};
		this.notificationsService.addNotification(notification);
	};
}
