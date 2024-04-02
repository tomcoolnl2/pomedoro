import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsTriggerComponent } from './settings-trigger.component';

describe('SettingsTriggerComponent', () => {
	let component: SettingsTriggerComponent;
	let fixture: ComponentFixture<SettingsTriggerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SettingsTriggerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsTriggerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
