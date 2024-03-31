import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { GridComponent } from './grid/grid.component';
import { HeaderComponent } from './header/header.component';
import { LoadingIndicatorComponent } from './loader/loading-indicator.component';

import { LoadingIndicatorService } from './loader/loading.service';
export { LoadingIndicatorService } from './loader/loading.service';

@NgModule({
	declarations: [
		ButtonComponent,
		GridComponent,
		HeaderComponent,
		LoadingIndicatorComponent,
	],
	imports: [CommonModule],
	exports: [
		ButtonComponent,
		GridComponent,
		HeaderComponent,
		LoadingIndicatorComponent,
	],
	providers: [LoadingIndicatorService],
})
export class UiModule {}
