import { Subject, catchError, finalize, takeUntil, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
	LoadingIndicatorService,
	NotificationsService,
	NotificationType,
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

	duration = 0;
	circumference = 2 * Math.PI * 90;
	dashOffset = 0;
	progress = 100;
	timerStatus!: TimerStatus;
	formattedDuration!: string;
	iconName: 'faPlay' | 'faPause' = 'faPlay';
	timerClassName: 'active' | 'inactive' = 'inactive';

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
		const notification = {
			message: 'This is a ERROR message',
			type: NotificationType.Error,
			persistent: true,
		};
		this.notificationsService.addNotification(notification);
	};
}
