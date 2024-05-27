import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GridComponent } from '../grid/grid.component';
import { GridItemComponent } from '../grid/grid-item.component';
import { IconComponent } from '../icon/icon.component';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
	let component: TimerComponent;
	let fixture: ComponentFixture<TimerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				GridComponent,
				GridItemComponent,
				IconComponent,
				TimerComponent,
			],
			imports: [FontAwesomeModule],
		}).compileComponents();

		fixture = TestBed.createComponent(TimerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
