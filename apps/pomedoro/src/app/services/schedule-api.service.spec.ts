import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleApiService } from './schedule-api.service';

describe('ScheduleApiService', () => {
	let service: ScheduleApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
		});
		service = TestBed.inject(ScheduleApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
