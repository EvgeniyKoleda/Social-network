import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

import { BUCKET_NAMES } from 'src/constants';

@Injectable()
export class S3ManagerService {
	constructor(@InjectAwsService(S3) private readonly s3: S3) {}

	async listBucketContents(bucket: string) {
		const response = await this.s3
			.listObjectsV2({ Bucket: bucket })
			.promise();
		return response.Contents.map((c) => c.Key);
	}

	listBucket() {
		this.s3.listBuckets(function (err, data) {
			if (err) console.log(err, err.stack);
			// an error occurred
			else console.log(data); // successful response
		});
	}

	async createBucket(Bucket: string) {
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
}
