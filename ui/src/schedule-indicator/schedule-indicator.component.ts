import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SessionType } from '@ng-pomedoro/model';

@Component({
	selector: 'ui-schedule-indicator',
	templateUrl: './schedule-indicator.component.html',
	styleUrl: './schedule-indicator.component.css',
})
export class ScheduleIndicatorComponent implements OnChanges {
	//
	@Input() public sessionType!: SessionType | null;
	public activeClassName = '';
	public activeItemIndex = 0;

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['sessionType']) {
			switch (this.sessionType) {
				case SessionType.ShortBreak:
					this.activeClassName = 'active-33';
					this.activeItemIndex = 1;
					break;
				case SessionType.LongBreak:
					this.activeClassName = 'active-66';
					this.activeItemIndex = 2;
					break;
				default:
					this.activeClassName = 'active-0';
					this.activeItemIndex = 0;
					break;
			}
		}
	}
}
