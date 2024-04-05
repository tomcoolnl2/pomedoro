import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Notification } from './notifications.model';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
	//
	faClose = faClose;
	
	notifications: Notification[] = [];
	private notificationsSubscription!: Subscription;

	constructor(private notificationsService: NotificationsService) { }

	ngOnInit(): void {
		this.notificationsSubscription = this.notificationsService.notifications.subscribe(notifications => {
			this.notifications = notifications;
		});
	}

	ngOnDestroy(): void {
		this.notificationsSubscription.unsubscribe();
	}

	removeNotification(id: string): void {
		console.log(id)
		this.notificationsService.removeNotification(id);
	}
}