import { Currency } from '../utils/constants';

export interface CreateWalletDto {
    readonly amount: number;
    readonly currency: Currency;
    readonly userId: string;
}
