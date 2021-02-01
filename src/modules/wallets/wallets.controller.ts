import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiBody, ApiProperty } from '@nestjs/swagger';

import { RESPONSES, Error, DeletedObject} from 'src/constants';

import { Wallet } from './entities/wallet.entity';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@ApiTags('wallets')
@ApiBearerAuth()
@Controller('wallets')
export class WalletsController {
	constructor(private readonly walletsService: WalletsService) {}

	@ApiCreatedResponse({ 
		description: RESPONSES.CREATE('wallet'),
		type: Wallet,
	})
	@ApiUnauthorizedResponse({ 
		description: RESPONSES.UNATHORIZED(),
		type: Error 
	})
	@ApiBadRequestResponse({ 
		description: RESPONSES.BAD_REQUEST(),
		type: Error 
	})
	@Post()
	@ApiBody({ type: CreateWalletDto })
	create(@Body() createWalletDto: CreateWalletDto) {
		return this.walletsService.create(createWalletDto);
	}

	@ApiUnauthorizedResponse({ 
		description: RESPONSES.UNATHORIZED(),
		type: Error 
	})
	@ApiOkResponse({ 
		description: RESPONSES.RETURN_ALL('wallets'),
		type: [Wallet],
	})
	@Get()
	findAll() {
		return this.walletsService.findAll();
	}

	@ApiUnauthorizedResponse({ 
		description: RESPONSES.UNATHORIZED(),
		type: Error 
	})
	@ApiOkResponse({ 
		description: RESPONSES.RETURN('wallet'),
		type: Wallet,
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.walletsService.findOne(id);
	}

	@ApiCreatedResponse({ 
		description: RESPONSES.UPDATE('wallet'),
		type: Wallet,
	})
	@ApiUnauthorizedResponse({ 
		description: RESPONSES.UNATHORIZED(),
		type: Error 
	})
	@ApiBadRequestResponse({ 
		description: RESPONSES.BAD_REQUEST(),
		type: Error 
	})
	@Put(':id')
	@ApiBody({ type: UpdateWalletDto })
	update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
		return this.walletsService.update(id, updateWalletDto);
	}

	@ApiUnauthorizedResponse({ 
		description: RESPONSES.UNATHORIZED(),
		type: Error 
	})
	@ApiBadRequestResponse({ 
		description: RESPONSES.BAD_REQUEST(),
		type: Error 
	})
	@ApiOkResponse({ 
		description: RESPONSES.DELETE('wallet'),
		type: DeletedObject
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.walletsService.remove(id);
	}
}
