import { Currency } from '../utils/constants';

export interface UpdateWalletDto {
    readonly amount: number;
    readonly currency: Currency;
    readonly userId: string;
}
