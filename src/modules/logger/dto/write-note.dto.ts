import { MessageTypes } from '../utils/constants';

export interface WriteNoteDto {
    readonly type: MessageTypes;
    readonly message: string;
    readonly date: string;
}
