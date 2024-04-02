import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleIndicatorComponent } from './schedule-indicator.component';

describe('ScheduleIndicatorComponent', () => {
	let component: ScheduleIndicatorComponent;
	let fixture: ComponentFixture<ScheduleIndicatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ScheduleIndicatorComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ScheduleIndicatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
