import {
  Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('settings')
class Setting {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @Column('boolean')
  chat: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Setting };
