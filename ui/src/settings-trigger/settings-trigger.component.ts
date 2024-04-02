import { Component, Input } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'ui-settings-trigger',
	templateUrl: './settings-trigger.component.html',
	styleUrl: './settings-trigger.component.css',
})
export class SettingsTriggerComponent {
	public faGear = faGear;
	@Input() onClick: ((event: MouseEvent) => void) | undefined;

	public onClickHandler(event: MouseEvent): void {
		event.preventDefault();
		if (this.onClick) {
			this.onClick(event);
		}
	}
}
