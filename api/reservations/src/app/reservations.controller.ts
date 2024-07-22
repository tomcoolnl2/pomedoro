import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from '@pomodoro/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationDocument } from './models/reservation.schema';
import { ReservationsService } from './reservations.service';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
	//
	constructor(private readonly reservationsService: ReservationsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	@ApiOperation({ summary: 'Create reservation' })
	@ApiResponse({ status: 201, description: 'Reservation created', type: ReservationDocument })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public async create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() user): Promise<ReservationDocument> {
		return this.reservationsService.create(createReservationDto, user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	@ApiOperation({ summary: 'Get all reservations' })
	@ApiResponse({ status: 200, description: 'All reservations', type: [ReservationDocument] })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public async findAll(): Promise<ReservationDocument[]> {
		return this.reservationsService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	@ApiOperation({ summary: 'Get reservation by ID' })
	@ApiResponse({ status: 200, description: 'Reservation by ID', type: ReservationDocument })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'Not found' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public async findOne(@Param('id') id: string): Promise<ReservationDocument> {
		return this.reservationsService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	@ApiOperation({ summary: 'Update reservation' })
	@ApiResponse({ status: 200, description: 'Updated reservation', type: ReservationDocument })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'Not found' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public async update(
		@Param('id') id: string,
		@Body() updateReservationDto: UpdateReservationDto
	): Promise<ReservationDocument> {
		return this.reservationsService.update(id, updateReservationDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	@ApiOperation({ summary: 'Remove reservation' })
	@ApiResponse({ status: 200, description: 'Removed reservation', type: ReservationDocument })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 404, description: 'Not found' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public async remove(@Param('id') id: string): Promise<ReservationDocument> {
		return this.reservationsService.remove(id);
	}
}
