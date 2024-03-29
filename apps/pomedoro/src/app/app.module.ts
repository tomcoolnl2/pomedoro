import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UiModule } from '@ng-pomedoro/ui';
import { appRoutes } from './app.routes';

import { HomePageComponent } from './pages/home/home.component';

@NgModule({
	declarations: [AppComponent, HomePageComponent],
	imports: [
		BrowserModule,
		CommonModule,
		RouterModule.forRoot(appRoutes),
		UiModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
