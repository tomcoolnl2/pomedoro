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
import { ScheduleIndicatorComponent } from './schedule-indicator/schedule-indicator.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { LoadingIndicatorService } from './loader/loading-indicator.service';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationTypeEnum } from './notifications/notifications.model';

const components = [
	ButtonComponent,
	GridComponent,
	GridItemComponent,
	HeaderComponent,
	IconComponent,
	LoadingIndicatorComponent,
	NotificationsComponent,
	ScheduleIndicatorComponent,
];

@NgModule({
	declarations: components,
	imports: [CommonModule, FormsModule, FontAwesomeModule],
	exports: components,
	providers: [LoadingIndicatorService, NotificationsService],
})
export class UiModule {}

export { LoadingIndicatorService, NotificationsService, NotificationTypeEnum };
