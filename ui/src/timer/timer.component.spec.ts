import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimerStatus } from '@ng-pomedoro/model';
import { SharedStateFacade } from '@ng-pomedoro/state';
import { GridComponent } from '../grid/grid.component';
import { GridItemComponent } from '../grid/grid-item.component';
import { IconComponent } from '../icon/icon.component';
import { TimerComponent } from './timer.component';

class MockSharedStateFacade {
	startTimer() {
		return of(TimerStatus.Running);
	}
	pauseTimer() {
		return of(TimerStatus.Paused);
	}
	resumeTimer() {
		return of(TimerStatus.Running);
	}
}

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
			providers: [
				{ provide: SharedStateFacade, useClass: MockSharedStateFacade },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TimerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
