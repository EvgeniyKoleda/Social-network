import { Injectable } from '@nestjs/common';
import { Logger as DefaultLogger, LoggerService as IDefaultLoggerService } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as moment from 'moment';

import { DATE_TIME_FORMAT } from 'src/constants';

import { MessageTypes } from './utils/constants';
import { LoggerDocument } from './schemas/logger.schema';
import { WriteNoteDto } from './dto/write-note.dto';

@Injectable()
export class LoggerService extends DefaultLogger {
  // loggerModel: Model<LoggerDocument>;

  constructor(
    // @InjectConnection('loggins') private connection: Connection
  ) {
    super();

    // this.loggerModel = connection.model('loggins');
  }

  logMessage(type: MessageTypes, message: string, trace: string = '') {
    let date = moment().format(DATE_TIME_FORMAT);

    let loggerHandler = super[type];
    loggerHandler(message, trace);

    // return this.writeNote({ type, message: message + trace, date });
  }

  // async writeNote(writeNoteDto: WriteNoteDto) {
  //   let loggerNote = new this.loggerModel(writeNoteDto);

  //   return loggerNote.save();
  // }

  log(message: string) {
    // super.log(message);
    console.log('MESSAGE');

    return this.logMessage(MessageTypes.log, message);
  }

  async error(message: string, trace: string) {
    console.log('MESSAGE');

    super.error(message, trace);

    return this.logMessage(MessageTypes.error, message, trace);
  }

  async warn(message: string) {
    console.log('MESSAGE');

    super.warn(message);

    return this.logMessage(MessageTypes.warn, message);
  }

  async debug(message: string) {
    console.log('MESSAGE');

    super.debug(message);

    return this.logMessage(MessageTypes.debug, message);
  }

  async verbose(message: string) {
    console.log('MESSAGE');

    super.verbose(message);

    return this.logMessage(MessageTypes.verbose, message);
  }
}
