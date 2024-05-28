import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { sharedStateId } from './+state/shared.state';
import { SharedStateFacade } from './+state/shared.facade';
import { SharedStateEffects } from './+state/shared.effects';
import * as SharedStateReducers from './+state/shared.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			sharedStateId,
			SharedStateReducers.sharedReducer
		),
		EffectsModule.forFeature([SharedStateEffects]),
	],
	providers: [SharedStateFacade],
})
export class SharedStateModule {}
