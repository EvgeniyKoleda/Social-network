import { LoggerService as DefaultLoggerService } from '@nestjs/common';
// import { model } from 'mongoose';
import * as moment from 'moment';
import * as winston from 'winston';

import { DATE_TIME_FORMAT } from 'src/constants';

import { MessageTypes } from './utils/constants';
// import { Logger, LoggerSchema } from './schemas/logger.schema';
// import { WriteNoteDto } from './dto/write-note.dto';

export class LoggerService implements DefaultLoggerService {
	// private loggerModel = model(Logger.name, LoggerSchema);

	private winstonLogger = winston.createLogger({
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.timestamp(),
					winston.format.printf(
						(msg) =>
							`[${moment(msg.timestamp).format(DATE_TIME_FORMAT)}] [${
								msg.level
							}] - ${msg.message}`,
					),
				),
			}),
		],
	});

	async logMessage(type: MessageTypes, message: string, trace = '') {
		this.winstonLogger.log(type, message);

		// return this.writeNote({
		// 	type,
		// 	message: message + trace,
		// 	date: moment().format(DATE_TIME_FORMAT),
		// });
	}

	// async writeNote(writeNoteDto: WriteNoteDto) {
	// 	let loggerNote = new this.loggerModel(writeNoteDto);

	// 	return loggerNote.save();
	// }

	async log(message: string) {
		return this.logMessage(MessageTypes.info, message);
	}

	async error(message: string, trace: string) {
		return this.logMessage(MessageTypes.error, message, trace);
	}

	async warn(message: string) {
		return this.logMessage(MessageTypes.warn, message);
	}

	async debug(message: string) {
		return this.logMessage(MessageTypes.debug, message);
	}

	async verbose(message: string) {
		return this.logMessage(MessageTypes.verbose, message);
	}
}
