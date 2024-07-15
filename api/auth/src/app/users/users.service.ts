import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
	//
	constructor(private readonly usersRepository: UsersRepository) {}

	public create(createUserDto: CreateUserDto) {
		return this.usersRepository.create(createUserDto as UserDocument);
	}

	// public findAll() {
	// 	return `This action returns all users`;
	// }

	// public findOne(id: number) {
	// 	return `This action returns a #${id} user`;
	// }

	// public update(id: number, updateUserDto: UpdateUserDto) {
	// 	return `This action updates a #${id} user`;
	// }

	// public remove(id: number) {
	// 	return `This action removes a #${id} user`;
	// }
}
