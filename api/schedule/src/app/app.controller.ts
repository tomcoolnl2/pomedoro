import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
	//
	constructor(private readonly appService: AppService) {}

	@Get('schedules')
	public getSchedules() {
		return this.appService.getSchedules();
	}
}
