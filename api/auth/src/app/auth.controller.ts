import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserDocument } from './users/models/user.schema';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
	//
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiOperation({ summary: 'User login' })
	@ApiBody({ type: UserDocument })
	@ApiResponse({ status: 200, description: 'Login successful', type: UserDocument })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	public async login(@CurrentUser() user: UserDocument, @Res({ passthrough: true }) response: Response) {
		await this.authService.login(user, response);
		response.send(user);
	}
}
