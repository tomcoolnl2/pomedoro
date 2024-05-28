import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedStateModule } from '@ng-pomedoro/state';
import {
	UiModule,
	LoadingIndicatorService,
	NotificationsService,
} from '@ng-pomedoro/ui';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		CommonModule,
		UiModule,
		StoreModule.forRoot(
			{},
			{
				metaReducers: [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),
		EffectsModule.forRoot([]),
		SharedStateModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
		}),
	],
	providers: [LoadingIndicatorService, NotificationsService],
	bootstrap: [AppComponent],
})
export class AppModule {}
