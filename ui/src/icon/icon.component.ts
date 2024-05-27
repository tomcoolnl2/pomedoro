import { Component, Input } from '@angular/core';
import {
	IconDefinition,
	faClose,
	faGear,
	faPlay,
	faPause,
	faQuestion,
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'ui-icon',
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.css',
})
export class IconComponent {
	//
	@Input() iconName!: string;
	@Input() onClick: ((event: MouseEvent) => void) | undefined;

	faClose = faClose;
	faGear = faGear;
	faPlay = faPlay;
	faPause = faPause;

	get faIconName(): IconDefinition {
		switch (this.iconName) {
			case 'faClose':
				return faClose;
			case 'faGear':
				return faGear;
			case 'faPlay':
				return faPlay;
			case 'faPause':
				return faPause;
			default:
				return faQuestion;
		}
	}

	public onClickHandler(event: MouseEvent): void {
		event.preventDefault();
		if (this.onClick) {
			this.onClick(event);
		}
	}
}
