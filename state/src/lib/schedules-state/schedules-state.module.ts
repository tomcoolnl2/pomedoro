import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SchedulesFacade } from './+state/schedules.facade';
import { schedulesReducer } from './+state/schedules.reducer';
import { SchedulesEffects } from './+state/schedules.effects';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('schedules', schedulesReducer),
		EffectsModule.forFeature([SchedulesEffects]),
	],
	providers: [SchedulesFacade],
})
export class SchedulesStateModule {}
