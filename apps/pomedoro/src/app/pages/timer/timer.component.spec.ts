import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerPageComponent } from './timer.component';

describe('TimerComponent', () => {
	let component: TimerPageComponent;
	let fixture: ComponentFixture<TimerPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TimerPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TimerPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
