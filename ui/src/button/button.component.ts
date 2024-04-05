import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-button',
	templateUrl: './button.component.html',
	styleUrl: './button.component.css',
})
export class ButtonComponent {
	@Input() size: 'small' | 'medium' | 'large' = 'medium';
	@Input() style: 'primary' | 'secondary' | 'default' = 'default';
	@Input() label = 'Button';
	@Input() tooltip = '';
	@Input() onClick: ((event: MouseEvent) => void) | undefined;

	onClickHandler(event: MouseEvent): void {
		if (this.onClick) {
			this.onClick(event);
		}
	}
}
