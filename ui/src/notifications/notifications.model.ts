export enum NotificationType {
	Success = 'success',
	Error = 'error',
	Info = 'info',
	Warning = 'warning',
}

export type Notification = {
	id?: string;
	message: string;
	type: NotificationType;
	persistent?: boolean;
	dismissable?: boolean;
};
