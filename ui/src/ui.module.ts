import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './button/button.component';
import { GridComponent } from './grid/grid.component';
import { GridItemComponent } from './grid-item/grid-item.component';
import { HeaderComponent } from './header/header.component';
import { LoadingIndicatorComponent } from './loader/loading-indicator.component';
import { SettingsTriggerComponent } from './settings-trigger/settings-trigger.component';

import { LoadingIndicatorService } from './loader/loading-indicator.service';
export { LoadingIndicatorService } from './loader/loading-indicator.service';

const components = [
	ButtonComponent,
	GridComponent,
	GridItemComponent,
	HeaderComponent,
	LoadingIndicatorComponent,
	SettingsTriggerComponent,
];

@NgModule({
	declarations: components,
	imports: [CommonModule, FontAwesomeModule],
	exports: components,
	providers: [LoadingIndicatorService],
})
export class UiModule {}
