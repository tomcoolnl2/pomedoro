import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
	@Input() size: 'small' | 'medium' | 'large' = 'medium';
	@Input() style: 'primary' | 'secondary' | 'default' = 'default';
	@Input() label = 'Button';
	@Input() tooltip = '';
}
