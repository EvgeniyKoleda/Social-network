import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from 'nest-aws';
import { S3 } from 'aws-sdk';

import { S3ManagerService } from './s3-manager.service';

@Module({
	imports: [AwsModule.forFeature(S3), ConfigModule.forRoot()],
	providers: [S3ManagerService],
	exports: [S3ManagerService],
})
export class S3ManagerModule {}
