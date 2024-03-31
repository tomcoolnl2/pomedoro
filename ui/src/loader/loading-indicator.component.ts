import { Component } from '@angular/core';
import { LoadingIndicatorService } from './loading.service';

@Component({
	selector: 'ui-loading-indicator',
	templateUrl: './loading-indicator.component.html',
	styleUrl: './loading-indicator.component.css',
})
export class LoadingIndicatorComponent {
	//
	constructor(public loadingIndicatorService: LoadingIndicatorService) {}
}
