import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { GridComponent } from './grid/grid.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
	declarations: [ButtonComponent, GridComponent, HeaderComponent],
	imports: [CommonModule],
	exports: [ButtonComponent, GridComponent, HeaderComponent],
})
export class UiModule {}
