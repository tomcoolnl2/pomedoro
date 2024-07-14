import { ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationDocument } from './models/reservation.schema';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
	//
	constructor(private readonly reservationsService: ReservationsService) {}

	@ApiOkResponse({ type: CreateReservationDto })
	@Post()
	create(@Body() createReservationDto: CreateReservationDto): Promise<ReservationDocument> {
		return this.reservationsService.create(createReservationDto);
	}

	@Get()
	findAll(): Promise<ReservationDocument[]> {
		return this.reservationsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<ReservationDocument> {
		return this.reservationsService.findOne(id);
	}

	@ApiOkResponse({ type: UpdateReservationDto })
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto): Promise<ReservationDocument> {
		return this.reservationsService.update(id, updateReservationDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<ReservationDocument> {
		return this.reservationsService.remove(id);
	}
}
