import { Migration } from 'mikro-orm';

export class Migration20200716010003 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "track" ("uuid" uuid not null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "artist" varchar(255) not null, "name" varchar(255) not null, "album" varchar(255) not null, "listened_at" timestamptz(0) not null);');
    this.addSql('alter table "track" add constraint "track_pkey" primary key ("uuid");');
  }

}
