import { BehaviorSubject, catchError, finalize, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PomodoroSchedule } from '@ng-pomedoro/model';
import {
	LoadingIndicatorService,
	NotificationsService,
	NotificationTypeEnum,
	ModalService,
} from '@ng-pomedoro/ui';
import { SharedStateFacade } from '@ng-pomedoro/state';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	//
	public readonly title = 'Pomedoro';

	schedules$ = new BehaviorSubject<PomodoroSchedule[] | null>(null);

	constructor(
		private sharedStateFacade: SharedStateFacade,
		private loadingIndicatorService: LoadingIndicatorService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	ngOnInit() {
		this.subscribeToDataChanges();
		this.fetchSchedules();
	}

	fetchSchedules() {
		this.loadingIndicatorService.show();
		this.sharedStateFacade
			.loadSchedules()
			.pipe(
				catchError((error) => {
					console.error('There was an error!', error);
					return throwError(() => new Error(error));
				}),
				finalize(() => {
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
					this.loadingIndicatorService.hide(); // TODO: Handle inside fetchSchedules, but for some reason the observable is not finalizing
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
