import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { MessageTypes } from '../utils/constants';

export type LoggerDocument = Logger & Document;

@Schema()
export class Logger {
	@Prop()
	id: string;

	@Prop({ required: true })
	type: MessageTypes;

	@Prop({ required: true })
	date: string;

	@Prop({ required: true })
	message: string;
}

export let LoggerSchema = SchemaFactory.createForClass(Logger);
