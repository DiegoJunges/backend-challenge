"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreatePlaces1611084485467 {
  async up(queryRunner) {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(new _typeorm.Table({
      name: 'places',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'country',
        type: 'varchar'
      }, {
        name: 'location',
        type: 'varchar'
      }, {
        name: 'goal',
        type: 'timestamp with time zone'
      }, {
        name: 'flag_url',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('places');
  }

}

exports.default = CreatePlaces1611084485467;