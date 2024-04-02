import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsTriggerComponent } from './settings-trigger.component';

describe('SettingsTriggerComponent', () => {
	let component: SettingsTriggerComponent;
	let fixture: ComponentFixture<SettingsTriggerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SettingsTriggerComponent],
			imports: [FontAwesomeModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsTriggerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
