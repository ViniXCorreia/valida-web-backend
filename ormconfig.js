/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: './.env' });
module.exports = {
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
};
