import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'upload' })
export default class Upload {
  @PrimaryGeneratedColumn()
  readonly id!: string;

  @Column()
  url!: string;

  @Column()
  key!: string;
}
