import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent } from './button/button.component';
import { GridComponent } from './grid/grid.component';
import { GridItemComponent } from './grid/grid-item.component';
import { HeaderComponent } from './header/header.component';
import { IconComponent } from './icon/icon.component';
import { LoadingIndicatorComponent } from './loader/loading-indicator.component';
import { ModalComponent } from './modal/modal.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ScheduleIndicatorComponent } from './schedule-indicator/schedule-indicator.component';

import { LoadingIndicatorService } from './loader/loading-indicator.service';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationTypeEnum } from './notifications/notifications.model';
import { ModalService } from './modal/modal.service';

const components = [
	ButtonComponent,
	GridComponent,
	GridItemComponent,
	HeaderComponent,
	IconComponent,
	LoadingIndicatorComponent,
	ModalComponent,
	NotificationsComponent,
	ScheduleIndicatorComponent,
];

@NgModule({
	declarations: components,
	imports: [CommonModule, FormsModule, FontAwesomeModule],
	exports: components,
	providers: [LoadingIndicatorService, NotificationsService, ModalService],
})
export class UiModule {}

export {
	LoadingIndicatorService,
	NotificationsService,
	NotificationTypeEnum,
	ModalService,
};
