import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from '@ng-pomodoro/common';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
	//
	protected readonly logger = new Logger(UserDocument.name);

	constructor(@InjectModel(UserDocument.name) usersModel: Model<UserDocument>) {
		super(usersModel);
	}
}
