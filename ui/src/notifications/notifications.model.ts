
export enum NotificationTypeEnum {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning'
  }

export type Notification = {
    id?: string;
    message: string;
    type: NotificationTypeEnum;
    persistent?: boolean;
    dismissable?: boolean;
}