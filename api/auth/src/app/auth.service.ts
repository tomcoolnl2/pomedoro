import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './users/models/user.schema';
import { TokenPayload } from './interfaces/token-payload.inderface';

@Injectable()
export class AuthService {
	//
	constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

	public async login(user: UserDocument, response: Response): Promise<void> {
		const tokenPayload: TokenPayload = { userId: user._id.toHexString() };
		const expires = new Date();
		expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));
		const token = this.jwtService.sign(tokenPayload);
		response.cookie('Authentication', token, { httpOnly: true, expires });
	}
}
