import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification } from './notifications.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
    //
    notifications = new BehaviorSubject<Notification[]>([]);

	addNotification({ id = uuidv4(), message, type, persistent = false, dismissable = true }: Notification): string {
		const newNotification = { id, message, type, persistent, dismissable };
		const updatedNotifications = [...this.notifications.value, newNotification];
		this.notifications.next(updatedNotifications);
		if (!persistent) {
			setTimeout(() => {
				this.removeNotification(id);
			}, 5000);
		}
		return id;
    }

	removeNotification(id: string) {
        this.notifications.next([...this.notifications.value.filter(n => n.id !== id)]);
    }
}