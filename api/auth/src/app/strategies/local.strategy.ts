import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/models/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	//
	constructor(private userService: UsersService) {
		super({ usernameField: 'email' });
	}

	public async validate(email: string, password: string): Promise<UserDocument> {
		return this.userService.vefifyUser(email, password);
	}
}
