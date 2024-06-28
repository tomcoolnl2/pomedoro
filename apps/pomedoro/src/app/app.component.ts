import { catchError, finalize, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
	LoadingIndicatorService,
	NotificationsService,
	NotificationType,
	ModalService,
} from '@ng-pomedoro/ui';
import { SharedStateFacade } from '@ng-pomedoro/state';
import { SessionType, TimerStatus } from '@ng-pomedoro/model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	//
	public readonly title = 'Pomedoro';

	public duration!: number;
	public remainingTime!: number;
	public timerStatus!: TimerStatus;
	public timerActive!: boolean;
	public sessionType!: SessionType | null;

	constructor(
		private sharedStateFacade: SharedStateFacade,
		private loadingIndicatorService: LoadingIndicatorService,
		private notificationsService: NotificationsService,
		private modalService: ModalService
	) {}

	public ngOnInit() {
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

		this.sharedStateFacade.selectTimerDuration().subscribe((duration) => {
			this.duration = duration;
		});

		this.sharedStateFacade.selectRemainingTime().subscribe((time) => {
			this.remainingTime = time;
		});

		this.sharedStateFacade.selectTimerStatus().subscribe((status) => {
			this.timerStatus = status;
		});

		this.sharedStateFacade.isTimerActive().subscribe((active) => {
			this.timerActive = active;
		});

		this.sharedStateFacade.selectSession().subscribe((session) => {
			this.sessionType = session ? session.type : null;
		});
	}

	private fetchSchedules() {
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

	public handleOpenSettingsDialog = () => {
		this.modalService.open();
	};

	public handleApplySettings = () => {
		this.modalService.close();
	};

	public triggerError = () => {
		this.notificationsService.addNotification({
			message: 'This is a ERROR message',
			type: NotificationType.Error,
			persistent: true,
		});
	};
}
