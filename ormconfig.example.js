module.exports = {
  type: process.env.POSTGRES_TYPE,
  host: process.env.POSTGRES_HOST,
  "extra": {
    "socketPath": process.env.POSTGRES_HOST
  },
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABAASE,
  logging: false,
  synchronize: true,

  entities: [
    "dist/modules/**/infra/typeorm/entities/*.js"
  ],
  migrations: [
    "dist/shared/infra/typeorm/migrations/*.js"
  ],
  cli: {
    "migrationsDir": "dist/shared/infra/typeorm/migrations"
  }
}

