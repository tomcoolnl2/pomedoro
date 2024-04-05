import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'ui-timer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './timer.component.html',
	styleUrl: './timer.component.css',
})
export class TimerComponent {}
