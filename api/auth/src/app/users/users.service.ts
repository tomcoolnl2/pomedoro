import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
	//
	constructor(private readonly usersRepository: UsersRepository) {}

	public async create(createUserDto: CreateUserDto) {
		await this.validateCreateUserDto(createUserDto);
		return this.usersRepository.create({
			...createUserDto,
			password: bcrypt.hashSync(createUserDto.password, 10),
		} as UserDocument);
	}

	private async validateCreateUserDto(createUserDto: CreateUserDto) {
		try {
			await this.usersRepository.findOne({ email: createUserDto.email });
		} catch (error) {
			return;
		}
		throw new UnprocessableEntityException('User with this email already exists.');
	}

	public async vefifyUser(email: string, password: string) {
		const user = await this.usersRepository.findOne({ email });
		const passwordIsValid = bcrypt.compare(password, user.password);
		if (user && passwordIsValid) {
			return user;
		}
		throw new UnauthorizedException('Credentials are not valid.');
	}

	public getUser(getUserDto: GetUserDto): Promise<UserDocument> {
		return this.usersRepository.findOne(getUserDto);
	}
}
