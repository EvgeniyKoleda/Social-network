import { Injectable } from '@nestjs/common';
import { Logger as DefaultLogger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';
import * as moment from 'moment';

import { DATE_TIME_FORMAT } from 'src/constants';

import { MessageTypes } from './utils/constants';
import { Logger, LoggerDocument, LoggerSchema } from './schemas/logger.schema';
import { WriteNoteDto } from './dto/write-note.dto';

// @Injectable()
export class LoggerService extends DefaultLogger {

  private loggerModel: Model<LoggerDocument> = model(Logger.name, LoggerSchema);
  // constructor() {
  //   super();

  //   // console.log(model(Logger.name, LoggerSchema));

  //   this.loggerModel = model(Logger.name, LoggerSchema);
  // }

  async logMessage(type: MessageTypes, message: string, trace: string = '') {
    console.log(message);

    return this.writeNote({ type, message: message + trace, date: moment().format(DATE_TIME_FORMAT) });
  }

  async writeNote(writeNoteDto: WriteNoteDto) {
    let loggerNote = new this.loggerModel(writeNoteDto);

    return loggerNote.save();
  }

  async log(message: string) {
    super.log(message);
    // console.log('LOG' + '  ' + message);

    return this.logMessage(MessageTypes.log, message);
  }

  async error(message: string, trace: string) {
    super.error(message, trace);

    return this.logMessage(MessageTypes.error, message, trace);
  }

  async warn(message: string) {
    super.warn(message);

    return this.logMessage(MessageTypes.warn, message);
  }

  async debug(message: string) {
    super.debug(message);

    return this.logMessage(MessageTypes.debug, message);
  }

  async verbose(message: string) {
    super.verbose(message);

    return this.logMessage(MessageTypes.verbose, message);
  }
}
