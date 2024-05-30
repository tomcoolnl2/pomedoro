import { Subject, catchError, finalize, takeUntil, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
	LoadingIndicatorService,
	NotificationsService,
	NotificationType,
	Notification,
	ModalService,
} from '@ng-pomedoro/ui';
import { SharedStateFacade } from '@ng-pomedoro/state';
import { TimerStatus } from '@ng-pomedoro/model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	//
	public readonly title = 'Pomedoro';
	private destroy$ = new Subject<void>();

	public duration = 0;
	public timerStatus!: TimerStatus;

	constructor(
		private sharedStateFacade: SharedStateFacade,
		private loadingIndicatorService: LoadingIndicatorService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	ngOnInit() {
		//
		this.fetchSchedules();

		this.sharedStateFacade.selectError().subscribe((error) => {
			if (error) {
				this.notificationsService.addNotification({
					message: error.message,
					type: NotificationType.Error,
				});
			}
		});

		this.sharedStateFacade
			.selectTimerDuration()
			.pipe(takeUntil(this.destroy$))
			.subscribe((duration) => {
				this.duration = duration;
			});

		this.sharedStateFacade
			.selectTimerStatus()
			.pipe(takeUntil(this.destroy$))
			.subscribe((status) => {
				this.timerStatus = status;
			});
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
			.subscribe();
	}

	handleOpenSettingsDialog = () => {
		this.modalService.open();
	};

	handleApplySettings = () => {
		this.modalService.close();
	};

	triggerError = () => {
		const notification: Notification = {
			message: 'This is a ERROR message',
			type: NotificationType.Error,
			persistent: true,
		};
		this.notificationsService.addNotification(notification);
	};
}
