import { Component, Input } from '@angular/core';

@Component({
	selector: 'ui-grid',
	templateUrl: './grid.component.html',
	styleUrl: './grid.component.css',
})
export class GridComponent {
	//
	@Input() cols!: number | string;
	@Input() rows!: number | string;
	@Input() colGap!: 'xs' | 's' | 'm';
	@Input() rowGap!: 'xs' | 's' | 'm';
	@Input() alignItems!: string;
	@Input() padding!: 'xs' | 's' | 'm';
	@Input() autoFlow!: string;
	@Input() rowHeight!: string;
	@Input() colWidth!: string;
	@Input() className!: string;
	@Input() style!: { [key: string]: string };

	getStyles() {
		const rowHeight = this.rowHeight || '1fr';
		const colWidth = this.colWidth || '1fr';

		const style: { [key: string]: string } = {
			'--row-height': rowHeight,
			'--col-width': colWidth,
		};

		if (this.autoFlow) {
			style['grid-auto-flow'] = this.autoFlow;
		}

		if (typeof this.cols === 'string') {
			style['grid-template-columns'] = this.cols;
		}
		if (typeof this.rows === 'string') {
			style['grid-template-rows'] = this.rows;
		}

		if (this.alignItems) {
			style['align-items'] = this.alignItems;
		}

		return style;
	}
}
