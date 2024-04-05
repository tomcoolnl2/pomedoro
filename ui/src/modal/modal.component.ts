import { Component, Input } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
	selector: 'ui-modal',
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css',
})
export class ModalComponent {
	//
	@Input() header!: string;
	@Input() onClick: ((event: MouseEvent) => void) | undefined;

	constructor(public modalService: ModalService) {}

	onClickHandler(event: MouseEvent): void {
		if (this.onClick) {
			this.onClick(event);
		}
	}
}
