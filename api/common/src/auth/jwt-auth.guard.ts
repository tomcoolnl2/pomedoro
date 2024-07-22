import * as RxJS from 'rxjs';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	//
	constructor(@Inject('AUTH_INJECTION_TOKEN') private readonly authClient: ClientProxy) {}

	public canActivate(context: ExecutionContext): false | RxJS.Observable<boolean> {
		const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
		if (!jwt) {
			return false;
		}
		return this.authClient.send<UserDto>('authenticate', { Authentication: jwt }).pipe(
			RxJS.tap((responseUserDto) => {
				context.switchToHttp().getRequest().user = responseUserDto;
			}),
			RxJS.map(() => true)
		);
	}
}
