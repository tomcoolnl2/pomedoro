import { Model, FilterQuery, UpdateQuery, Types } from 'mongoose';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
	//
	protected abstract readonly logger: Logger;

	protected readonly model: Model<TDocument>;

	constructor(model: Model<TDocument>) {
		this.model = model;
	}

	private handleError(error: Error, methodName: string, filterQuery?: FilterQuery<TDocument>): never {
		//
		const errorMessage = filterQuery
			? `Failed to ${methodName} document with filterQuery: ${JSON.stringify(filterQuery)} - ${error.message}`
			: `Failed to ${methodName} document - ${error.message}`;

		this.logger.error(errorMessage, error.stack);

		throw error;
	}

	private handleEmptyResult(filterQuery?: FilterQuery<TDocument>): never {
		const message = `No documents found${filterQuery ? ` with filterQuery: ${JSON.stringify(filterQuery)}` : ''}`;
		this.logger.warn(message);
		throw new NotFoundException(message);
	}

	private validateAndConvertId(filterQuery: FilterQuery<TDocument>): void {
		if ('_id' in filterQuery) {
			if (!Types.ObjectId.isValid(filterQuery._id)) {
				throw new BadRequestException(`Invalid _id format: ${filterQuery._id}`);
			}
			filterQuery._id = new Types.ObjectId(filterQuery._id as string);
		}
	}

	public async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
		try {
			const createdDocument = new this.model({
				...document,
				_id: new Types.ObjectId(),
			});

			const savedDocument = await createdDocument.save();
			return savedDocument.toJSON() as TDocument;
		} catch (error) {
			this.handleError(error as Error, 'create');
		}
	}

	public async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
		try {
			this.validateAndConvertId(filterQuery);
			const document = await this.model.findOne(filterQuery).lean<TDocument>(true);
			console.log('findOne', document);
			if (!document) {
				this.handleEmptyResult(filterQuery);
			}
			return document;
		} catch (error) {
			console.log('findOne error', error);
			this.handleError(error as Error, 'findOne', filterQuery);
		}
	}

	public async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
		try {
			this.validateAndConvertId(filterQuery);
			const document = await this.model.findOneAndUpdate(filterQuery, update, { new: true }).lean<TDocument>(true);
			if (!document) {
				this.handleEmptyResult(filterQuery);
			}
			return document;
		} catch (error) {
			this.handleError(error as Error, 'findOneAndUpdate', filterQuery);
		}
	}

	public async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
		try {
			const documents = await this.model.find(filterQuery).lean<TDocument[]>(true);
			if (!documents) {
				this.handleEmptyResult(filterQuery);
			}
			return documents;
		} catch (error) {
			this.handleError(error as Error, 'find', filterQuery);
		}
	}

	public async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
		try {
			this.validateAndConvertId(filterQuery);
			const document = await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
			if (!document) {
				this.handleEmptyResult(filterQuery);
			}
			return document;
		} catch (error) {
			this.handleError(error as Error, 'findOneAndDelete', filterQuery);
		}
	}
}
