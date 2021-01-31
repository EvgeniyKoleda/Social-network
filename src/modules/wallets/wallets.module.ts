import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/db/database.module';

import { Wallet } from './entities/wallet.entity';
import { walletProviders } from './wallets.providers';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletsController],
  providers: [
    ...walletProviders,
    WalletsService,
  ]
})
export class WalletsModule { }
