import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UiModule } from '@ng-pomedoro/ui';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, HttpClientModule, CommonModule, UiModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
