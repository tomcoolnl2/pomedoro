import { Component, Input } from '@angular/core';
import { SessionType } from '@ng-pomedoro/model';

@Component({
	selector: 'ui-schedule-indicator',
	templateUrl: './schedule-indicator.component.html',
	styleUrl: './schedule-indicator.component.css',
})
export class ScheduleIndicatorComponent {
	@Input() sessionType!: SessionType | null;
	readonly sessionTypeEnum = SessionType;

	constructor() {
		console.log(this.sessionType, this.sessionTypeEnum);
	}
}
