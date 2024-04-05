import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UiModule, LoadingIndicatorService, NotificationsService } from '@ng-pomedoro/ui';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, HttpClientModule, CommonModule, UiModule],
	providers: [LoadingIndicatorService, NotificationsService],
	bootstrap: [AppComponent],
})
export class AppModule {}
