import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrentUser } from '@pomodoro/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDocument } from './users/models/user.schema';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
	//
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	@HttpCode(200) // Post requests in NestJS default to '201 Created'
	@ApiOperation({ summary: 'User login' })
	@ApiBody({ type: UserDocument })
	@ApiResponse({ status: 200, description: 'Login successful', type: UserDocument })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	public async login(@CurrentUser() user: UserDocument, @Res({ passthrough: true }) response: Response): Promise<void> {
		await this.authService.login(user, response);
		response.send(user);
	}

	@UseGuards(JwtAuthGuard)
	@MessagePattern('authenticate')
	public async authenticate(@Payload() payload: { Authentication: string }) {
		console.log('Authenticating user...', payload);
	}
}
