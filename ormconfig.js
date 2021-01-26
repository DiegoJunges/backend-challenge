module.exports = {
  type: process.env.POSTGRES_TYPE,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  cli: {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
