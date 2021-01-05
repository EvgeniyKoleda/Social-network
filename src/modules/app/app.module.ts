import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { DatabaseModule } from 'src/db/database.module';
import { UsersModule } from 'src/modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'socnet-admin',
		password: 'socnet-secure-password',
		database: 'socnet',
		entities: [
			'src/modules/**/*.entity{.ts,.js}',
		],
		migrations: [
			'src/db/migrations/*.ts'
		],
		cli: {
			migrationsDir: 'src/db/migrations'
		}
	}), UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
