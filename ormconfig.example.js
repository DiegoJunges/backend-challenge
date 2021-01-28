module.exports = {
  type: '',
  host: '',
  username: '',
  password: '',
  database: '',
  entities: [
    "./dist/modules/**/infra/typeorm/entities/*.js"
  ],
  migrations: [
    "./dist/shared/infra/typeorm/migrations/*.js"
  ],
  cli: {
    "migrationsDir": "./dist/shared/infra/typeorm/migrations"
  }
}
