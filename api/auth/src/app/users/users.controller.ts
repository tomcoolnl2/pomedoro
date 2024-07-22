import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserDocument } from './models/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../../../../common/src/decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
	//
	constructor(private readonly usersService: UsersService) {}

	@Post('user')
	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201, description: 'User created', type: UserDocument })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 422, description: 'UnprocessableEntityException' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public async createUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get('user')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get current user' })
	@ApiResponse({ status: 200, description: 'User', type: UserDocument })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 404, description: 'Not found', type: UserDocument })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public async getUser(@CurrentUser() user: UserDocument): Promise<UserDocument> {
		return user;
	}
}
