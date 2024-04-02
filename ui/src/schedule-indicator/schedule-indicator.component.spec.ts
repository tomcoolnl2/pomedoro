import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GridComponent } from '../grid/grid.component';
import { GridItemComponent } from '../grid-item/grid-item.component';
import { ScheduleIndicatorComponent } from './schedule-indicator.component';

describe('ScheduleIndicatorComponent', () => {
	let component: ScheduleIndicatorComponent;
	let fixture: ComponentFixture<ScheduleIndicatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				GridComponent,
				GridItemComponent,
				ScheduleIndicatorComponent,
			],
			imports: [FormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(ScheduleIndicatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
