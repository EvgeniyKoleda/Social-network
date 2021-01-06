import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PROVIDER_CONSTS } from './utils/constants';

@Injectable()
export class WalletsService {
  constructor(
    @Inject(PROVIDER_CONSTS.WALLETS_REPOSITORY)
    private walletRepository: Repository<Wallet>,
  ) { }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    let cretedWallet = new Wallet();
    let wallet = Object.assign(cretedWallet, createWalletDto);

    return this.walletRepository.save(wallet);
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async findOne(id: string): Promise<Wallet> {
    return this.walletRepository.findOne(id);
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    await this.walletRepository.save({ id, ...updateWalletDto });

    return this.walletRepository.findOne(id);
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.walletRepository.delete(id);

    return { id };
  }
}
