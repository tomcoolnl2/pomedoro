import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-grid-item',
	templateUrl: './grid-item.component.html',
})
export class GridItemComponent {
	@Input() columnStart: string | undefined;
	@Input() columnEnd: string | undefined;
	@Input() placeSelf: string | undefined;
	@Input() onClick: ((event: MouseEvent) => void) | undefined;

	getStyle(): { [key: string]: string } {
		//
		const style: { [key: string]: string } = {};

		if (this.columnStart) {
			style['grid-column-start'] = this.columnStart;
		}
		if (this.columnEnd) {
			style['grid-column-end'] = this.columnEnd;
		}
		if (this.placeSelf) {
			style['place-self'] = this.placeSelf;
		}

		return style;
	}

	onClickHandler(event: MouseEvent): void {
		if (this.onClick) {
			this.onClick(event);
		}
	}
}
