import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { GetUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.inderface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	//
	constructor(public configService: ConfigService, private readonly userService: UsersService) {
		const secret = configService.get('JWT_SECRET');
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request | { Authentication?: string }) =>
					'cookies' in request ? request.cookies?.Authentication : request.Authentication,
			]),
			secretOrKey: secret,
		});
	}

	public async validate({ userId }: TokenPayload) {
		return this.userService.getUser({ _id: userId } as GetUserDto);
	}
}
