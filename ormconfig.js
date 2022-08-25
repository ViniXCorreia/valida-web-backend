require('dotenv').config({ path: './.env' });
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['./dist/**/entity/*.entity.{js,ts}'],
  migrations: ['src/migration/**/*.js'],
  subscribers: ['src/subscriber/**/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/**/entity',
    migrationsDir: 'src/_shared/migration',
    subscribersDir: 'src/subscriber',
  },
};
