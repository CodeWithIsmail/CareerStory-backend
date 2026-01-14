import { Column } from 'typeorm';

export function UrlNullableColumn() {
  return Column({ type: 'varchar', length: 255, nullable: true });
}
