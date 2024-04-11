import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'ui-timer-controls',
	templateUrl: './timer-controls.component.html',
	styleUrl: './timer-controls.component.css',
})
export class TimerControlsComponent {
	//
	@Output() buttonClicked: EventEmitter<boolean> = new EventEmitter();

	togglePlayPause(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (this.buttonClicked) {
			this.buttonClicked.emit(input.checked);
		}
	}
}
