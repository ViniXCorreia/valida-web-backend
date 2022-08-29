import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteModule } from './cliente/cliente.module';
import { PropostaComercialController } from './proposta-comercial/proposta-comercial.controller';
import { PropostaComercialModule } from './proposta-comercial/proposta-comercial.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { AuditModule } from './audit/audit.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			logging: true,
			entities: ['dist/**/entities/*.entity.{js,ts}'],
			migrations: ['dist/migration/*.js'],
			subscribers: ['src/subscriber/**/*.{js,ts}'],
			migrationsTableName: 'migration_table',
			cli: {
				migrationsDir: 'src/migration',
			},
		}),
		ClienteModule,
		UsuarioModule,
		PropostaComercialModule,
		AuditModule,
		AuthModule,
	],
	controllers: [
		ClienteController,
		UsuarioController,
		PropostaComercialController,
	],
})
export class AppModule {}
