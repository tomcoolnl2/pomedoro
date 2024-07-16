import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationDocument } from './models/reservation.schema';
import { ReservationsService } from './reservations.service';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
	//
	constructor(private readonly reservationsService: ReservationsService) {}

	@Post()
	@ApiOperation({ summary: 'Create reservation' })
	@ApiResponse({ status: 201, description: 'Reservation created', type: ReservationDocument })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public create(@Body() createReservationDto: CreateReservationDto): Promise<ReservationDocument> {
		return this.reservationsService.create(createReservationDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all reservations' })
	@ApiResponse({ status: 200, description: 'All reservations', type: [ReservationDocument] })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public findAll(): Promise<ReservationDocument[]> {
		return this.reservationsService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get reservation by ID' })
	@ApiResponse({ status: 200, description: 'Reservation by ID', type: ReservationDocument })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'Not found' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public findOne(@Param('id') id: string): Promise<ReservationDocument> {
		return this.reservationsService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update reservation' })
	@ApiResponse({ status: 200, description: 'Updated reservation', type: ReservationDocument })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'Not found' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto): Promise<ReservationDocument> {
		return this.reservationsService.update(id, updateReservationDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Remove reservation' })
	@ApiResponse({ status: 200, description: 'Removed reservation', type: ReservationDocument })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'Not found' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public remove(@Param('id') id: string): Promise<ReservationDocument> {
		return this.reservationsService.remove(id);
	}
}
