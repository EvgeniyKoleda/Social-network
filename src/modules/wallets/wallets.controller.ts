import { Body, Param } from '@nestjs/common';

import { CustomController, ApiGet, ApiGetAll, ApiPost, ApiPut, ApiDelete } from 'src/utils/decorators';

import { Wallet } from './entities/wallet.entity';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@CustomController('wallets')
export class WalletsController {
	constructor(private readonly walletsService: WalletsService) {}


	@ApiPost(Wallet, 'wallets', CreateWalletDto)
	create(@Body() createWalletDto: CreateWalletDto) {
		return this.walletsService.create(createWalletDto);
	}

	@ApiGetAll(Wallet, 'wallets')
	findAll() {
		return this.walletsService.findAll();
	}

	@ApiGet(Wallet, 'wallets')
	findOne(@Param('id') id: string) {
		return this.walletsService.findOne(id);
	}

	@ApiPut(Wallet, 'wallets', UpdateWalletDto)
	update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
		return this.walletsService.update(id, updateWalletDto);
	}

	@ApiDelete('wallets')
	remove(@Param('id') id: string) {
		return this.walletsService.remove(id);
	}
}
