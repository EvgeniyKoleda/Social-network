import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import stream from 'stream';
import { ConfigService } from '@nestjs/config';
import { createWriteStream } from 'fs';
import { join } from 'path';

import { BUCKET_NAMES, ENVIRONMENTS } from 'src/constants';
import config from 'src/config';

@Injectable()
export class S3ManagerService {
	constructor(
		@InjectAwsService(S3) private readonly s3: S3,
		private configService: ConfigService,
	) {}

	async listBucketContents(bucket: string) {
		const response = await this.s3.listObjectsV2({ Bucket: bucket }).promise();
		return response.Contents.map((c) => c.Key);
	}

	listBucket() {
		this.s3.listBuckets(function (err, data) {
			if (err) console.log(err, err.stack);
			// an error occurred
			else console.log(data); // successful response
		});
	}

	createBucket(Bucket: string) {
		const params = {
			Bucket,
		};
		this.s3.waitFor('bucketNotExists', params, (err) => {
			if (err) {
				console.log(err, err.stack);
			} else {
				this.s3.createBucket(params, (err, data) => {
					if (err) {
						console.log(err, err.stack);
					} else {
						console.log(data);
					}
				});
			}
		});
	}

	initBuckets() {
		for (const name in BUCKET_NAMES) {
			this.createBucket(BUCKET_NAMES[name]);
		}
	}

	removeAllBuckets() {
		for (const name in BUCKET_NAMES) {
			this.s3.deleteBucket(
				{
					Bucket: BUCKET_NAMES[name],
				},
				(err, data) => {
					if (err) {
						console.log(err, err.stack);
					} else {
						console.log(data);
					}
				},
			);
		}
	}

	async putObjectByStream(
		Bucket: string,
		readStream: stream,
		fileName: string,
	) {
		let params = { Bucket, Key: fileName, Body: readStream };

		if (!this._isS3Enabled()) {
			return this._writeOnLocalEnv(fileName, readStream);
		}

		try {
			let res = await this.s3.upload(params).promise();

			return {
				...res,
				Location: this._getS3Url(res.Location),
			};
		} catch (e) {
			throw e;
		}
	}

	private _getS3Url(location: string) {
		const environment = this.configService.get<string>('ENVIRONMENT');

		return environment === ENVIRONMENTS.PROD
			? location
			: location.replace('localstack', 'localhost');
	}

	private _isS3Enabled() {
		return JSON.parse(this.configService.get<string>('S3_ENABLED'));
	}

	private _writeOnLocalEnv(
		fileName: string,
		readStream: stream,
	): Promise<{ Location: string }> {
		let writeStream = createWriteStream(
			join('/app', `/${config.filesDir}/${fileName}`),
		);

		let url = `${config.host.getHost()}/${fileName}`;

		readStream.pipe(writeStream);

		return new Promise((resolve, reject) => {
			writeStream.on('finish', () =>
				resolve({
					Location: url,
				}),
			);

			writeStream.on('error', reject);
		});
	}
}
