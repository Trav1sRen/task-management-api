import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TaskStatus extends BaseEntity {
  @PrimaryColumn()
  statusId: number;

  @Column()
  statusName: string;
}
