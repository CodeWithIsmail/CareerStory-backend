import { Column } from 'typeorm';

export function UrlNullableColumn() {
  return Column({ length: 255, nullable: true });
}
